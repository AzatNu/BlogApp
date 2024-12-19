import { Routes, Route } from "react-router-dom";
import { StyledFooter, StyledHeader } from "./components";
import {
    Authorization,
    Registration,
    Users,
    Post,
    PostId,
    PostCreate,
    PostEdit,
    Error
} from "./pages/index";
import { useDispatch } from "react-redux";
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
    const dispatch = useDispatch();

    return (
        <AppColumn>
            <StyledHeader />
            <Routes>
                <Route path="/" element={<Post />} />
                <Route path="/login" element={<Authorization />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/users" element={<Users />} />
                <Route path="/post/:postId" element={<PostId />} />
                <Route path="/postCreate" element={<PostCreate />}/>
                <Route path="/post/:postId/edit" element={<PostEdit />} />
                    <Route path="*" element={<Error />} />
            </Routes>
            <StyledFooter />
        </AppColumn>
    );
};
