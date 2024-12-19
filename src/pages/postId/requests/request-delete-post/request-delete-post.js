import { useNavigate} from "react-router-dom";
import { request } from "../../../utils/request";

export const useRequestDeletePost = () => {
    const navigate = useNavigate();
    const requestDeletePost = (id) => {
        return async (dispatch) => {
            await request(`/posts/${id}`, "DELETE");
                dispatch({
                    type: "SET_DELETE_POST_BUTTON_CLICK",
                    deletePostButtonClick: false,
                });
                navigate("/");
        };
    };
    return { requestDeletePost };
};
