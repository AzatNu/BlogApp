import { removeComment } from "./session";
import { ROLE } from "../const";
export const createSession = async (role_id) => {
    const session = {
        logout() {
            Object.keys(session).forEach((key) => delete session[key]);
        },
    };
    switch (role_id) {
        case ROLE.ADMIN: {
            session.removeComment = removeComment;
        }
        case ROLE.MODERATOR: {
            session.removeComment = removeComment;
        }
        case ROLE.READER: {
        }
        default:
            return session;
    }
};
