import { Avatar, Box, Paper, Typography } from "@mui/material";
import type UserInfo from "../../interfaces/UserInfo";
import { Fragment } from "react";

function createShortName(user: UserInfo): string {
    const surname: string = user.personal?.surname ?? "Фамилия";
    const name: string = user.personal?.name ? user.personal?.name[0] : "И";
    const patronymic: string = user.personal?.patronymic ? user.personal?.patronymic[0] : "О";
    return `${surname} ${name}. ${patronymic}.`
}

export default function UserChip({ user }: { user: UserInfo }) {
    return (
        <Fragment>
            <Paper sx={{ display: "flex", alignItems: "center", paddingInline: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", paddingRight: 1 }}>
                    <Box>
                        <Typography>
                            {createShortName(user)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>{user.table_id}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Avatar />
                </Box>
            </Paper>
        </Fragment>
    );
}