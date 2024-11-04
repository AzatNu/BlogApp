export const getRoles = async () => {
    const response = await fetch("http://localhost:3005/roles");
    return response.json();
};
