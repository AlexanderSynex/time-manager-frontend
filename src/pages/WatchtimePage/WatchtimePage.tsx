import { Box, MenuItem, Select } from "@mui/material";

export default function WatchtimePage() {
    // const months: string[] = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    return <Box>
        <Select>
            <MenuItem>Январь</MenuItem>
            <MenuItem>Февраль</MenuItem>
        </Select>
    </Box>
}