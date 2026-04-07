import { Box, IconButton } from "@mui/material";
import type UserInfo from "../../interfaces/UserInfo";
import UserChip from "../UserChip/UserChip";

import ScheduleIcon from '@mui/icons-material/TableChart';

export default function UserControls({ user }: { user: UserInfo }) {
    return (
        <Box sx={{ display: "flex", flexDirection: 'row', alignItems: 'center'}}>
            <Box>
                <IconButton>
                    <ScheduleIcon/>
                </IconButton>
            </Box>
            <UserChip user={user} />
        </Box>
    );
}