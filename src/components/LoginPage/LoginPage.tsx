
import { IconButton, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import './LoginPage.css'
import React, { useState } from 'react';
import { authUser, type UserAuthInfo } from '../../requests/login/AuthUser';

type LoggedInModifier = {
    stateModifier: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginPage({ stateModifier }: LoggedInModifier) {

    const [passwordNeeded, setPasswordNeeded] = useState<boolean>(true);

    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>('');
    
    return (
        <form>
            <div>
                <TextField
                    placeholder="Табельный номер"
                    required
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setLogin(event.target.value) }} />

                <IconButton type='button' onClick={
                    () => {
                        authUser({
                            login: login,
                            password: password
                        } as UserAuthInfo).then(response => {
                            if (response?.logged) {
                                stateModifier(response?.logged);
                            }
                        }).catch(error => {
                            stateModifier(false);
                            alert("ERROR: " + error);
                        })
                    }
                }> <LoginIcon /></IconButton>
            </div>

            <div>
                {
                    passwordNeeded ?
                        <TextField
                            type="password"
                            placeholder="Пароль"
                            autoComplete="current-password"
                            defaultValue=""
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value) }}
                        />
                        : <></>
                }
            </div>
        </form >
    );
}
