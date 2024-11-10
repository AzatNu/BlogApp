import { useNavigate } from "react-router-dom";
export const useRequestUpdatePostId = () => {
    const backNavigate = useNavigate();
    const requestUpdatePostId = (id, title, content, urlImg, userLogin) => {
        return async (dispatch) => {
            const response = await fetch(`http://localhost:3005/posts/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    image_url: urlImg,
                    author: userLogin,
                }),
            });
            if (response.ok) {
                backNavigate("/post");
            }
        };
    };

    return { requestUpdatePostId };
};
