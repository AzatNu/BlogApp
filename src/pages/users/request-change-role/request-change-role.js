import { useSelector } from "react-redux";
import { selectUpdateUserList } from "../../../selectors/index";

export const useRequestChangeUserRole = () => {
    const updateUsersList = useSelector(selectUpdateUserList);
    const changeUserRole = (id, newRole) => {
        return async (dispatch) => {
            const response = await fetch(`http://localhost:3005/users/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    role_id: newRole,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                dispatch({
                    type: "SET_UPDATE_USER_LIST",
                    updateUsersList: !updateUsersList,
                });
            } else {
                console.error("Ошибка изменения роли пользователя");
            }
        };
    };

    return { changeUserRole };
};
