import { useNavigate} from "react-router-dom";

export const useRequestDeletePost = () => {
    const backNavigate = useNavigate();
    const requestDeletePost=(id)=>{
        return async (dispatch) => {
            const response = await fetch(`http://localhost:3005/posts/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                dispatch({
                    type: "SET_DELETE_POST_BUTTON_CLICK",
                    deletePostButtonClick: false,
                });
                backNavigate("/");
            } else {
                console.error("Ошибка удаления поста");
            }
        };
    }
    return { requestDeletePost };
}
