export const getComments = async () => {
    const response = await fetch(`http://localhost:3005/comments`);
    return response.json();
}
