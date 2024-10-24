import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
const Content = styled.div`
    text-align: center;
    padding: 120px 0;
`;
const H2 = styled.h2`
    text-align: center;
`;
const Header = () => <div>это шапка</div>;
const Footer = () => <div>это подвал</div>;
export const Blog = () => {
    return (
        <>
            <Header />
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
            <Footer />
        </>
    );
};
