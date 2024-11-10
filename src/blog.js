import { Routes, Route } from "react-router-dom";
import { StyledFooter, StyledHeader } from "./components";
import {
    Authorization,
    Registration,
    Users,
    Post,
    PostId,
    PostCreate,
    PostEdit
} from "./pages/index";
import { useDispatch } from "react-redux";
import { setUser } from "./bff/actions";
import styled from "styled-components";
import { useLayoutEffect } from "react";


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
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const currentUserData = sessionStorage.getItem('userData');
        if (!currentUserData) {
            return;
        }
        const currentUserDataJSON = JSON.parse(currentUserData);
        dispatch(setUser(currentUserDataJSON));
    }, [dispatch]);
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
                <Route path="/post/:postId/edit" element={<PostEdit />} />
                    <Route path="*" element={<div>Ошибка</div>} />
            </Routes>
            <StyledFooter />
        </AppColumn>
    );
};
