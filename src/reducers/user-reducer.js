import { ROLE } from "../const";
const initialUserState = {
    id: null,
    login: null,
    role_id: ROLE.GUEST,
    session: null,
};
export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                ...action.payload,
            };
        case "LOGOUT":
            return initialUserState;

        default:
            return state;
    }
};
