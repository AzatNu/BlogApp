
export const useRequestCreateComment = () => {
    const date = new Date().toLocaleString("ru");

    const requestCreateComment = (content, postId, userLogin) => {
        return async (dispatch) => {
            const response = await fetch("http://localhost:3005/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: content,
                    post_id: postId,
                    author: userLogin,
                    published_at: date,
                }),
            });

        }
    }

    return { requestCreateComment };
}
