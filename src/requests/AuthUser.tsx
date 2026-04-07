import { ServerRequest } from "./base/ApiInstance";

export interface UserAuthInfo {
    login: string;
    password: string;
};

interface AuthInfo {
    token: string;
};

export const authUser = async (info: UserAuthInfo): Promise<AuthInfo | null> => {
    return await ServerRequest('/user/auth/login', 'POST', info);
}