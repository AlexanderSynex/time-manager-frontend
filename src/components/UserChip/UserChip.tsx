import { Avatar, Box, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import type UserInfo from "../../interfaces/UserInfo";
import React, { Fragment } from "react";
import type MenuEntry from "../../interfaces/MenuEntry";

function createShortName(user: UserInfo): string {
    const surname: string = user.personal?.surname ?? "Фамилия";
    const name: string = user.personal?.name ? user.personal?.name[0] : "И";
    const patronymic: string = user.personal?.patronymic ? user.personal?.patronymic[0] : "О";
    return `${surname} ${name}. ${patronymic}.`
}

export default function UserChip(
    { user, state, menus }: 
    { user: UserInfo, state?: string | null, menus?: MenuEntry[]}) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (menus?.length == 0) return;
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Fragment>
            <Paper sx={{ display: "flex", alignItems: "center", paddingInline: 1 }} onClick={handleClick}>
                <Stack sx={{ display: "flex", flexDirection: "column", paddingRight: 1 }}>
                    <Typography>
                        {createShortName(user)} (таб. {user.table_id})
                    </Typography>

                    <Typography variant="caption">
                        {state}
                    </Typography>
                </Stack>
                <Box>
                    <Avatar/>
                </Box>
            </Paper>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {menus?.map((menu, _) => (
                    <MenuItem key={menu.label} onClick={menu.callback}>{menu.label}</MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
}