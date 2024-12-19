import { request } from "../../../utils/request";
import { selectRefreshPost } from "../../../../selectors";
import { useDispatch, useSelector } from "react-redux"
export const useRequestCreateComment = () => {
const refreshPost = useSelector(selectRefreshPost);

const dispatch = useDispatch();
    const requestCreateComment = (content, postId) => {
        dispatch({type:"SET_CREATE_COMMENT_BUTTON_CLICKED",
            createButtonClicked: true
        })
        return async (dispatch) => {
            await request(`/posts/${postId}/comments`, "POST", {
                content,
            })
            dispatch({
                type: "SET_REFRESH_POST",
                refreshPost: !refreshPost
            })
            dispatch({type:"SET_CREATE_COMMENT_BUTTON_CLICKED",
                createButtonClicked: false
            })
        }
    }

    return { requestCreateComment };
}
