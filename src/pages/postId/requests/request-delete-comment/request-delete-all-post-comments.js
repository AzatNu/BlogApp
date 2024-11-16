export const useRequestDeleteAllPostComments = () => {
    const requestDeleteAllPostComments = (postId) => {
        return async (dispatch) => {
            const commentsResponse = await fetch(`http://localhost:3005/comments?post_id=${postId}`);
            const comments = await commentsResponse.json();
            for (const comment of comments) {
                const deleteResponse = await fetch(`http://localhost:3005/comments/${comment.id}`, {
                    method: "DELETE",
                });
            }
        };
    };
    return { requestDeleteAllPostComments };
};
