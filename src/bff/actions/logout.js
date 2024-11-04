import { server } from "../server";

export const logout = () => (dispatch, getState) => {
    const { user } = getState();
    server.logout(user.session);
    dispatch({
        type: "LOGOUT",
    });
};
