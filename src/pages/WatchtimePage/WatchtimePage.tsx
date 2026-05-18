import { Box, MenuItem, Select, Stack, type SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import WorktimeTable from "../../components/WorktimeTable/WorktimeTable";

const months: string[] = [
    "Январь", "Февраль", "Март",
    "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь",
    "Октябрь", "Ноябрь", "Декабрь" ];

// const currentMonth = ((month_number: number): CalendarMonth => {
//     const month = months[month_number];
//     let days: CalendarDay[] = (() => {
//         const currentDate = new Date();
//         return Array.from({ length: month.days }, (_, i) => {
//             currentDate.setDate(i);
//             return { isWeekend: isWeekend(currentDate) }
//         });
//     })();
//     return { name: month.name, days: days };
// })(new Date().getMonth())

export default function WatchtimePage() {
    const [month,setMonth] = useState<number>(new Date().getMonth());

    const handleMonthChange = (e: SelectChangeEvent<number>) => {
        setMonth(e.target.value);
    };

    return (
    <Stack>
        <Select defaultValue={month} onChange={handleMonthChange}>
          {months.map((month, index)=>(
            <MenuItem key={index} value={index}>{month}</MenuItem>
          ))}
        </Select>

        <WorktimeTable month={month}/>
    </Stack>
    );
}