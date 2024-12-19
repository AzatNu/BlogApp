const initialPostState = {
    deletePostButtonClick: false,
    refreshPost: false,
    createButtonClicked: false
};

export const postReducer = (state = initialPostState, action) => {
    switch (action.type) {
        case "SET_DELETE_POST_BUTTON_CLICK":
            return {
                ...state,
                deletePostButtonClick: action.deletePostButtonClick,
            };

        case "SET_REFRESH_POST":
            return {
                ...state,
                refreshPost: action.refreshPost
            }

            case "SET_CREATE_COMMENT_BUTTON_CLICKED":
                return{
                    ...state,
                    createButtonCliked: action.createButtonCliked
                }

        default:
            return state;
    }
};
