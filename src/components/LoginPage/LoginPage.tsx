
import { IconButton, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import './LoginPage.css'
import React, { useState } from 'react';
import { authUser, type UserAuthInfo } from '../../requests/AuthUser';
import type IAuthInfo from '../../interfaces/UserSchema';

type AuthSetter = {
    tokenSetter: React.Dispatch<React.SetStateAction<IAuthInfo>>;
};

export default function LoginPage({ tokenSetter }: AuthSetter) {

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
                            tokenSetter({ token: response?.token });
                        }).catch(error => {
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
