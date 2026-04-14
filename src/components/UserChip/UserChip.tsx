import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import type UserInfo from "../../interfaces/UserInfo";
import { Fragment } from "react";

function createShortName(user: UserInfo): string {
    const surname: string = user.personal?.surname ?? "Фамилия";
    const name: string = user.personal?.name ? user.personal?.name[0] : "И";
    const patronymic: string = user.personal?.patronymic ? user.personal?.patronymic[0] : "О";
    return `${surname} ${name}. ${patronymic}.`
}

export default function UserChip({ user, state }: { user: UserInfo, state?: string | null }) {
    return (
        <Fragment>
            <Paper sx={{ display: "flex", alignItems: "center", paddingInline: 1 }}>
                <Stack sx={{ display: "flex", flexDirection: "column", paddingRight: 1 }}>

                    <Typography>
                        {createShortName(user)} (таб. {user.table_id})
                    </Typography>
                    
                    <Typography variant="caption">
                        {state}
                    </Typography>
                </Stack>
                <Box>
                    <Avatar />
                </Box>
            </Paper>
        </Fragment>
    );
}