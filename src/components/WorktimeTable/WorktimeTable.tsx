import { useState } from "react";

const months: number[] = [
     31, (() => { return (new Date().getFullYear() % 4 == 0 ? 29 : 28) })(), 31, 
     30, 31, 30,
     31, 31, 30,
     31, 30, 31 ];

const headers = ['День', 'Пришел на работу', 'Ушел с работы', 'Статус'];


function isWeekend(date: Date): boolean {
    return date.getDay() >= 5;
}

export default function WorktimeTable({month}: {month: number}) {
    const [days, _] = useState<{day: number, weekend: boolean}[]>(
        Array.from({length: months[month]},(_, index) => ({day: index + 1, weekend: false}))
    );
    
    return (
    <table>
        <thead>
        <tr>
            {headers.map((value, i)=>(
            <th key={i}>{value}</th>
            ))}
        </tr>
        </thead>
        <tbody>
        {days.map((day, index) => (
            <tr key={index}>
            <td>{day.day}</td>
            <td>--</td>
            <td>--</td>
            <td>{day.weekend ? "Будний" : "Выходной"}</td>
            </tr>
        ))}
        </tbody>
    </table>
    )
};