export const getUser = async (loginToFind) => {
    const response = await fetch(
        `http://localhost:3005/users?login=${loginToFind}`
    );
    const loadedUsers = await response.json();
    return loadedUsers[0];
};
