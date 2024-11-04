import { useDispatch, useSelector } from "react-redux";
import { selectUpdateUserList } from "../../../selectors/index";
export const useRequestDeleteUser = (id) => {
    const dispatch = useDispatch();
    const updateUsersList = useSelector(selectUpdateUserList);
    const requestDeleteUser = (id) => {
        fetch(`http://localhost:3005/users/${id}`, {
            method: "DELETE",
        }).then((response) => {
            return response.json();
        });
        dispatch({
            type: "SET_UPDATE_USER_LIST",
            updateUsersList: !updateUsersList,
        });
    };
    return { requestDeleteUser };
};
