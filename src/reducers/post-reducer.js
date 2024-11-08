const initialPostState = {deletePostButtonClick: false};
export const postReducer = (state = initialPostState, action) => {
    switch (action.type) {
        case "SET_DELETE_POST_BUTTON_CLICK":
            return {
                ...state,
                deletePostButtonClick: action.deletePostButtonClick,
            };
        default:
            return state;
    }
};
