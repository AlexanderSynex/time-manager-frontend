import { useEffect, useState } from 'react';
import './WorktimePage.css'
import { Box, Button } from '@mui/material';
import { arriveOnWork, departFromWork } from '../../requests/Worktime/WorktimeActions';
import { getUserWorktimeInfo } from '../../requests/Info/WorktimeInfo';

function extractTime(date: Date): string {
    return `${date.getHours()}:${date.getMinutes()}`;
}

export default function WorktimePage() {
    const [loading, setLoading] = useState<boolean>(true);

    const [onWork, setOnWork] = useState<boolean>(false);
    const [workedToday, setWorkedToday] = useState<boolean>(false);

    const [arriveTime, setArriveTime] = useState<string>();
    const [leaveTime, setLeaveTime] = useState<string>();

    useEffect(() => {
        getUserWorktimeInfo().then(data => {
            setWorkedToday(data?.arrived != null);
            if (data == null) return;

            setOnWork(data?.on_work ?? false);

            if (data?.arrived != null) {
                setArriveTime(extractTime(new Date(data.arrived)));
            }
            if (data?.departed != null) {
                setLeaveTime(extractTime(new Date(data.departed)));
            }
            console.log(`worked: ${workedToday} onWork:${onWork} ${JSON.stringify(data)}`)
        })
            .catch(error => (alert(error)))
            .finally(() => setLoading(false))
    }, []);

    const setWorkerStatus = () => {
        if (!workedToday) return "не на работе";
        if (onWork) return "на работе"
        return "ушел";
    };

    const handleArrive = () => arriveOnWork().then(response => {
        if (response?.on_work != null) {
            setOnWork(response?.on_work);
            setWorkedToday(true);
        }
        if (response?.when) {
            setArriveTime(extractTime(new Date(response?.when)));
        }
    }).catch(error => {
        alert(error);
    });

    const handleLeave = () => departFromWork().then(response => {
        if (response?.on_work != null) {
            setOnWork(response?.on_work);
        }
        if (response?.when) {
            setLeaveTime(extractTime(new Date(response?.when)));
        }
    }).catch(error => {
        alert(error);
    });

    if (loading) {
        return <div></div>
    }

    return (
        <Box>
            <Box>Статус: {setWorkerStatus()}</Box>
            <Box>Пришел: {arriveTime || "нет данных"}</Box>
            <Box>Ушел: {leaveTime || "нет данных"}</Box>

            <Box sx={{ display: "flex" }}>
                <Button variant='contained' onClick={handleArrive} disabled={workedToday || onWork}>Пришел</Button>
                <Button variant='contained' disabled={!onWork} onClick={handleLeave}>Ушел</Button>
            </Box>
        </Box>
    );
}