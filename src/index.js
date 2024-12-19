import React from "react";
import ReactDOM from "react-dom/client";
import { Blog } from "./blog";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Blog />
        </Provider>
    </BrowserRouter>
);
