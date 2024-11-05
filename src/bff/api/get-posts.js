export const getPosts = async () => {
    const response = await fetch("http://localhost:3005/posts");
    return response.json();
};
