const initialPostsState = {
    posts: [],
    postById: []
};
export const postsReducer = (state = initialPostsState, action) => {

    switch (action.type) {
        case "SET_POSTS":
            return {
                ...state,
                posts: action.posts,
            };
        case "SET_POST_BY_ID":
            return {
                ...state,
                post: action.postById
            }
        default:
            return state;
    }
};
