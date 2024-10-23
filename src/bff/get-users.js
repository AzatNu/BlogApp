export const getUsers = await fetch("http://localhost:3005/users").then(
    (loadedUsers) => loadedUsers.json()
);
