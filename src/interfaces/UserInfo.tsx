import type { PersonalUserInfo } from "./PersonalUserInfo";


export default interface UserInfo {
    table_id: string;
    personal?: PersonalUserInfo;
}
