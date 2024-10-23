export const addUser = (regLogin, regPassword) =>
    fetch(
        "http://localhost:3005/users",
        {
            method: "POST",
            body: JSON.stringify({
                login: regLogin,
                password: regPassword,
                registred_at: new Date().toISOString(),
                role_id: 2,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }.then((response) => response.json())
    );
