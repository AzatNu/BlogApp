import { useNavigate } from "react-router-dom";
import {request} from "../../utils/request"
import PropTypes from "prop-types";
export const useRequestUpdatePostId = () => {
    const backNavigate = useNavigate();
    const requestUpdatePostId = (id, title, content, urlImg, userLogin) => {
        return async (dispatch) => {
            try {
                const response = await request(`/posts/${id}`, "PATCH", {
                    title: title,
                    content: content,
                    image_url: urlImg,
                    author: userLogin,
                });
                if (response) {
                    backNavigate(-1);
                }
            } catch (error) {
                console.error("Failed to update post", error);
            }
        };
    };
    return { requestUpdatePostId };
};

useRequestUpdatePostId.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    urlImg: PropTypes.string,
    userLogin: PropTypes.string,
};
