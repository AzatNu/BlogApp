import { Routes, Route } from "react-router-dom";
import { StyledFooter, StyledHeader } from "./components";
import styled from "styled-components";
const Content = styled.div`
    text-align: center;
    padding: 120px 0;
`;
const H2 = styled.h2`
    text-align: center;
`;
const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
    width: 1000px;
    background-color: rgba(128, 128, 128, 0.8);
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;

export const Blog = () => {
    return (
        <AppColumn>
            <StyledHeader />
            <Content>
                <H2>Контент</H2>
                <Routes>
                    <Route path="/" element={<div> Главная страница</div>} />
                    <Route path="/login" element={<div>Авторизация</div>} />
                    <Route path="/register" element={<div> Регистрация</div>} />
                    <Route path="/users" element={<div>Пользователи</div>} />
                    <Route path="/post" element={<div>Новая статья</div>} />
                    <Route path="/post/:postId" element={<div>Статья</div>} />
                    <Route path="*" element={<div>Ошибка</div>} />
                </Routes>
            </Content>
            <StyledFooter />
        </AppColumn>
    );
};
