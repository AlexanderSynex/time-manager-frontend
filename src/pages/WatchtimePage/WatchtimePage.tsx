import { Box, MenuItem, Select } from "@mui/material";
import { useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from "react";

export default function WatchtimePage() {
    const months: { name: string, days: number }[] = [
        { name: "Январь", days: 31 },
        { name: "Февраль", days: (() => { return (new Date().getFullYear() % 4 == 0 ? 29 : 28) })() },
        { name: "Март", days: 31 },
        { name: "Апрель", days: 30 },
        { name: "Май", days: 31 },
        { name: "Июнь", days: 30 },
        { name: "Июль", days: 31 },
        { name: "Август", days: 31 },
        { name: "Сентябрь", days: 30 },
        { name: "Октябрь", days: 31 },
        { name: "Ноябрь", days: 30 },
        { name: "Декабрь", days: 31 }
    ];

    const columns = useMemo(() => { }, []);

    const [month,] = useState<number>(new Date().getMonth());
    return (<Box>
        Month: {months[month].name}
    </Box>);
}