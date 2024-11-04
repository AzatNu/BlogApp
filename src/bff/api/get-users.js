export const getUsers = async () => {
    const response = await fetch("http://localhost:3005/users");
    return response.json();
};
