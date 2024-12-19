import { request } from "../../pages/utils/request";
export const getPost = (id) => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const response = await request(`/posts/${id}`);
        dispatch({
            type: "SET_POST_BY_ID",
            postById: response.post,
        });
    } catch (error) {
        console.error("Failed to fetch post", error);
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};

