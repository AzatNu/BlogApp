
export const useRequestDeleteComment = () => {
    const requestDeleteComment=(id)=>{
        return async (dispatch) => {
            const response = await fetch(`http://localhost:3005/comments/${id}`, {
                method: "DELETE",
            });

        };
    }
    return { requestDeleteComment };
}
