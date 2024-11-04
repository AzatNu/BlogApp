import { getUsers } from "./api/get-users";
import { addUser } from "./api/add-user";
import { getUser } from "./api/get-user";

import { sessions } from "./sessions";

export const server = {
    async logout(session) {
        sessions.remove(session);
    },
    async authorize(authLogin, authPassword) {
        const user = await getUser(authLogin);
        if (!user) {
            return {
                error: "Пользователь с таким логином не найден",
            };
        }
        if (authPassword !== user.password) {
            return {
                error: "Неверный пароль",
            };
        }
        return {
            error: null,
            res: {
                id: user.id,
                login: user.login,
                role_id: user.role_id,
                session: sessions.create(user),
            },
        };
    },
    async registred(regLogin, regPassword) {
        const existingUser = await getUsers(regLogin);
        if (existingUser.some((user) => user.login === regLogin)) {
            return {
                error: "Пользователь с таким логином уже существует",
            };
        }
        const newUser = await addUser(regLogin, regPassword);
        return {
            error: null,
            res: {
                id: newUser.id,
                login: newUser.login,
                role_id: newUser.role_id,
                session: sessions.create(newUser),
            },
        };
    },
};
