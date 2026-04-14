import { Box, Button } from "@mui/material";
import type React from "react";


function extractTime(date: Date): string {
    return `${date.getHours()}:${date.getMinutes()}`;
}


export default function TimecheckButton({ text, handler, enabled, time }: 
    { text: string,
        handler: () => Promise<void>, 
        enabled: boolean, 
        time: Date | null }) {
    return (
        <Box sx={{ display: "flex", gap: 1, alignItems: 'center' }}>
            <Button variant='outlined' onClick={handler} disabled={!enabled}>{text}</Button>
            {time ? extractTime(time) : null}
        </Box>
    );
}