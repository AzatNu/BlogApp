import { useNavigate } from "react-router-dom";

export const useRequestCreatePost = () => {
    const backNavigate = useNavigate();
    const date = new Date().toLocaleString("ru");
    const requestCreatePost = (title, content, urlImg, userLogin) => {
        return async (dispatch) => {
            const response = await fetch("http://localhost:3005/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    image_url: urlImg,
                    author: userLogin,
                    published_at: date,
                }),
            });
            if (response.ok) {
                backNavigate("/");
            }
        };
    };
    return { requestCreatePost };
};

