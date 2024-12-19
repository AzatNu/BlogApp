const initialUsersState = {
    updateUsersList: false,
    deleteButtonClick: false,
    userLogin: "",
    userId: "",
};

export const usersReducer = (state = initialUsersState, action) => {
    switch (action.type) {
        case "SET_UPDATE_USER_LIST":
            return {
                ...state,
                updateUsersList: action.updateUsersList,
            };
        case "DELETE_USER_BUTTON_CLICK":
            return {
                ...state,
                deleteButtonClick: action.deleteButtonClick,
            };
        case "SET_USER_LOGIN":
            return {
                ...state,
                userLogin: action.userLogin,
            };
        case "SET_USER_ID":
            return {
                ...state,
                userId: action.userId,
            };

        default:
            return state;
    }
};
