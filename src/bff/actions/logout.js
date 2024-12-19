import { request } from "../../pages/utils/request";


export const logout = () => (dispatch) => {

    request("/logout","POST")
    dispatch({
        type: "LOGOUT",
    });
};
