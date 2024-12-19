import { useNavigate } from "react-router-dom";
import {request} from "../../utils/request"
import PropTypes from "prop-types";

export const useRequestCreatePost = () => {
    const backNavigate = useNavigate();

    const requestCreatePost = (data) => {
        const {title, content, image_url, author} = data;
        return async (dispatch) => {
            const response = await request("/posts", "POST", {
                title: title,
                content: content,
                image_url: image_url,
                author: author
            });
            if (response) {
                backNavigate("/");
            }
        };
    };
    return { requestCreatePost };
};

useRequestCreatePost.propTypes = {
    requestCreatePost: PropTypes.func.isRequired,
};

