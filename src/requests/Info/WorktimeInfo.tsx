import type UserInfo from "../../interfaces/UserInfo";
import type { UserWorktime } from "../../interfaces/UserWorktimeInfo";

import { ServerRequest } from "../base/ApiInstance";

interface WorkDay {
    on_work: boolean;
    arrived: Date | null;
    departed: Date | null;
};

interface WorktimeStamp {
    table_id: string;
    time: WorkDay;
};

export const getUserWorktimeInfo = async (): Promise<UserWorktime | null> => {
    const data: WorktimeStamp = await ServerRequest('/user/time/', 'GET');
    const targetData: UserWorktime = {
        table_id: data.table_id,
        on_work: data?.time?.on_work ?? false,
        arrived: data?.time?.arrived ?? null,
        departed: data?.time?.departed ?? null
    };
    return targetData;
}
