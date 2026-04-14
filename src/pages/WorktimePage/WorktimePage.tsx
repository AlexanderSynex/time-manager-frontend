import { useEffect, useState } from 'react';
import './WorktimePage.css'
import { Box, CircularProgress, Stack } from '@mui/material';
import { arriveOnWork, departFromWork } from '../../requests/Worktime/WorktimeActions';
import { getUserWorktimeInfo } from '../../requests/Info/WorktimeInfo';
import TimecheckButton from '../../components/TimecheckButton/TimecheckButton';

export default function WorktimePage() {
    const [loading, setLoading] = useState<boolean>(true);

    const [onWork, setOnWork] = useState<boolean>(false);
    const [workedToday, setWorkedToday] = useState<boolean>(false);

    const [arriveTime, setArriveTime] = useState<Date | null>(null);
    const [leaveTime, setLeaveTime] = useState<Date | null>(null);

    useEffect(() => {
        getUserWorktimeInfo().then(data => {
            setWorkedToday(data?.arrived != null);
            if (data == null) return;

            setOnWork(data?.on_work ?? false);

            if (data?.arrived != null) {
                setArriveTime(new Date(data.arrived));
            }
            if (data?.departed != null) {
                setLeaveTime(new Date(data.departed));
            }
        })
            .catch(error => (alert(error)))
            .finally(() => setLoading(false))
    }, []);

    const handleArrive = () => arriveOnWork().then(response => {
        if (response?.on_work != null) {
            setOnWork(response?.on_work);
            setWorkedToday(true);
        }
        if (response?.when) {
            setArriveTime(new Date(response?.when));
        }
    }).catch(error => {
        alert(error);
    });

    const handleLeave = () => departFromWork().then(response => {
        if (response?.on_work != null) {
            setOnWork(response?.on_work);
        }
        if (response?.when) {
            setLeaveTime(new Date(response?.when));
        }
    }).catch(error => {
        alert(error);
    });

    if (loading) {
        return <Box>
            <CircularProgress />
        </Box>
    }

    return (
        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
            <Stack sx={{ display: 'flex', gap: 1 }}>
                <TimecheckButton text={"Пришел"} enabled={!workedToday && !onWork} handler={handleArrive} time={arriveTime} />
                <TimecheckButton text={"Ушел"} enabled={onWork} handler={handleLeave} time={leaveTime} />
            </Stack>
        </Box>
    );
}