import { useSelector } from "react-redux";
import { selectUpdateUserList } from "../../../selectors/index";
import { request } from "../../utils/request";

export const useRequestDeleteUser = () => {
    const updateUsersList = useSelector(selectUpdateUserList);
    const deleteUser = (id) => {
        return async (dispatch) => {
            const response = await request(`/users/${id}`, "DELETE");
            if (response) {
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
