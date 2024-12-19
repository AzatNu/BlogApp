const initialAppState = {
    wasLogout: false,
    isLoading: false
};
export const appReducer = (state = initialAppState, action) => {
    switch (action.type) {
        case "LOGOUT":
            return {
                ...state,
                wasLogout: !state.wasLogout,
            };
            case "SET_IS_LOADING":
                return{
                    ...state,
                    isLoading: action.isLoading
                }
        default:
            return state;
    }
};
