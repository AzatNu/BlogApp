export const getPost = async (id) => {
    const response = await fetch(`http://localhost:3005/posts/${id}`);
    return response.json();
};
