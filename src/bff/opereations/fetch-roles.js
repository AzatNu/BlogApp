import { getRoles } from "../api";
import { ROLE } from "../const";

import { sessions } from "../sessions";
export const fetchRoles = async (userSession) => {
    const accessRoles = [ROLE.ADMIN];
    if (!sessions.checkAccess(userSession, accessRoles)) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }
    const roles = await getRoles();
    return {
        error: null,
        res: roles,
    };
};
