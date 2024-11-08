import { Routes, Route } from "react-router-dom";
import { StyledFooter, StyledHeader } from "./components";
import {
    Authorization,
    Registration,
    Users,
    Post,
    PostId,
    PostCreate,
} from "./pages/index";

import styled from "styled-components";

const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
    width: 1000px;
    background-color: rgba(10, 10, 10, 0.8);
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;

export const Blog = () => {
    return (
        <AppColumn>
            <StyledHeader />
            <Routes>
                <Route path="/" element={<div> Главная страница</div>} />
                <Route path="/login" element={<Authorization />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/users" element={<Users />} />
                <Route path="/post" element={<Post />} />
                <Route path="/post/:postId" element={<PostId />} />
                <Route path="/postCreate" element={<PostCreate />}/>
                <Route path="*" element={<div>Ошибка</div>} />
            </Routes>
            <StyledFooter />
        </AppColumn>
    );
};
