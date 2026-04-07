import { ServerRequest } from "../base/ApiInstance";

interface WorktimeStatus {
    when: Date,
    on_work?: boolean;
};

export const arriveOnWork = async (): Promise<WorktimeStatus | null> => {
    return await ServerRequest('/user/time/arrive', 'PUT');
}

export const departFromWork = async (): Promise<WorktimeStatus | null> => {
    return await ServerRequest('/user/time/leave', 'PUT');
}
