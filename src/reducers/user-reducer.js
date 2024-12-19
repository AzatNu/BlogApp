import { ROLE } from "../const";
const initialUserState = {
    id: null,
    login: null,
    role: ROLE.GUEST,
    registrate_at: null,
    users:[]
};
export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                id: action.id,
                login: action.login,
                role: action.role,
                registrate_at: action.registrate_at,
            };
        case "LOGOUT":
            return initialUserState;
        case "SET_USERS":
            return {
                ...state,
                users: action.users
            }

        default:
            return state;
    }
};
