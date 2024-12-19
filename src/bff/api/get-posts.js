import { request } from "../../pages/utils/request";

export const getPosts = () => async (dispatch) => {
    dispatch({
        type: "SET_IS_LOADING",
        isLoading: true
    });
    try {
        const response = await request("/posts");
        dispatch({
            type: "SET_POSTS",
            posts: response.data
        });
    } catch (error) {
        console.error("Failed to fetch posts", error);
    }
    finally {
        dispatch({
            type: "SET_IS_LOADING",
            isLoading: false
        });
    }
};
