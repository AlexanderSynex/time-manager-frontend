import type UserInfo from "../../interfaces/UserInfo";

import { ServerRequest } from "../base/ApiInstance";

export const getUserInfo = async (): Promise<UserInfo | null> => {
    return await ServerRequest('/user', 'GET');
}
