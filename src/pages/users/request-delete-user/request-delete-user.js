import { useSelector } from "react-redux";
import { selectUpdateUserList } from "../../../selectors/index";

export const useRequestDeleteUser = () => {
    const updateUsersList = useSelector(selectUpdateUserList);
    const deleteUser = (id) => {
        return async (dispatch) => {
            const response = await fetch(`http://localhost:3005/users/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                dispatch({
                    type: "SET_UPDATE_USER_LIST",
                    updateUsersList: !updateUsersList,
                });
            } else {
                console.error("Ошибка удаления пользователя");
            }
        };
    };

    return { deleteUser };
};
