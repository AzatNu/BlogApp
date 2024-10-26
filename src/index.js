import React from "react";
import ReactDOM from "react-dom/client";
import { Blog } from "./blog";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Blog />
    </BrowserRouter>
);
