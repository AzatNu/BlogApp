import { request } from "../../pages/utils/request";

export const getUsers = () => async (dispatch) => {
    dispatch({
        type: "SET_IS_LOADING",
        isLoading: true
    })
    try {
        const response = await request("/users");
        dispatch({
            type: "SET_USERS",
            users: response.data
        });
        dispatch({
            type: "SET_IS_LOADING",
            isLoading: false
        })
    } catch (error) {
        console.error("Failed to fetch posts", error);
    }
};
