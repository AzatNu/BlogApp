const initialPostState = {deletePostButtonClick: false,
    refreshComments: false
};
export const postReducer = (state = initialPostState, action) => {
    switch (action.type) {
        case "SET_DELETE_POST_BUTTON_CLICK":
            return {
                ...state,
                deletePostButtonClick: action.deletePostButtonClick,
            };
            case "SET_REFRESH_COMMENTS":
                return {
                    ...state,
                    refreshComments: action.refreshComments
                }
        default:
            return state;
    }
};
