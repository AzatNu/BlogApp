import { request } from "../../../utils/request";
import { selectRefreshPost } from "../../../../selectors";
import { useDispatch, useSelector } from "react-redux";

export const useRequestDeleteComment = () => {
    const refreshPost = useSelector(selectRefreshPost);

    const requestDeleteComment = (postId, commentId) => {
        return async (dispatch) => {
            await request(`/posts/${postId}/comments/${commentId}`, "DELETE");
            dispatch({
                type: "SET_REFRESH_POST",
                refreshPost: !refreshPost
            })
        }
    }

    return { requestDeleteComment };
}

