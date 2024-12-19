import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import {
    appReducer,
    userReducer,
    usersReducer,
    postReducer,
    postsReducer,
} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    post: postReducer,
    posts: postsReducer,
    app: appReducer,
});
export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);
