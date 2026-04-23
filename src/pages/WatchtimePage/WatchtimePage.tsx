import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from "react";

interface Month {
    name: string,
    days: number
};

const months: Month[] = [
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

type CalendarDay = {
    isWeekend: boolean
};

interface CalendarMonth {
    name: string,
    days: CalendarDay[]
};

function isWeekend(date: Date): boolean {
    return date.getDay() >= 5;
}

const currentMonth = ((month_number: number): CalendarMonth => {
    const month = months[month_number];
    let days: CalendarDay[] = (() => {
        const currentDate = new Date();
        return Array.from({ length: month.days }, (_, i) => {
            currentDate.setDate(i);
            return { isWeekend: isWeekend(currentDate) }
        });
    })();
    return { name: month.name, days: days };
})(new Date().getMonth())

// const columnHelper = createColumnHelper<Person>() 


// const columns = [
//   columnHelper.group({
//     id: 'hello',
//     header: () => <span>Hello</span>,
//     // footer: props => props.column.id,
//     columns: [
//       columnHelper.accessor('firstName', {
//         cell: (info) => info.getValue(),
//         footer: (props) => props.column.id,
//       }),
//       columnHelper.accessor((row) => row.lastName, {
//         id: 'lastName',
//         cell: (info) => info.getValue(),
//         header: () => <span>Last Name</span>,
//         footer: (props) => props.column.id,
//       }),
//     ],
//   }),
//   columnHelper.group({
//     header: 'Info',
//     footer: (props) => props.column.id,
//     columns: [
//       columnHelper.accessor('age', {
//         header: () => 'Age',
//         footer: (props) => props.column.id,
//       }),
//       columnHelper.group({
//         header: 'More Info',
//         columns: [
//           columnHelper.accessor('visits', {
//             header: () => <span>Visits</span>,
//             footer: (props) => props.column.id,
//           }),
//           columnHelper.accessor('status', {
//             header: 'Status',
//             footer: (props) => props.column.id,
//           }),
//           columnHelper.accessor('progress', {
//             header: 'Profile Progress',
//             footer: (props) => props.column.id,
//           }),
//         ],
//       }),
//     ],
//   }),
// ]



export default function WatchtimePage() {
    const [days,] = useState<CalendarDay[]>(currentMonth.days);
    
    return (<Box>
        Месяц: {currentMonth.name}

        {JSON.stringify(currentMonth.days)}
    </Box>);
}