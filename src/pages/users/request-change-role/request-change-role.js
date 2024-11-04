import { useSelector, useDispatch } from "react-redux";
import { selectUpdateUserList } from "../../../selectors/index";

export const useRequestChangeUserRole = () => {
    const dispatch = useDispatch();
    const updateUsersList = useSelector(selectUpdateUserList);
    const requestChangeUserRole = (id, newRole) => {
        fetch(`http://localhost:3005/users/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                role_id: newRole,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        dispatch({
            type: "SET_UPDATE_USER_LIST",
            updateUsersList: !updateUsersList,
        });
    };

    return { requestChangeUserRole };
};
