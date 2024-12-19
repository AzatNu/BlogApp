import { useSelector } from "react-redux";
import { selectUpdateUserList} from "../../../selectors/index";
import { request } from "../../utils/request";

export const useRequestChangeUserRole = () => {
    const updateUsersList = useSelector(selectUpdateUserList);
    const changeUserRole = (id, newRole) => {
        return async (dispatch) => {
            const response = await request(`/users/${id}`, "PATCH", {
                role_id: newRole
            });

            if (response) {
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
