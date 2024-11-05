import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../bff/api";
import { useEffect, useState } from "react";
export const PostId = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    useEffect(() => {
        getPost(postId).then((data) => setPost(data));
    }, []);
    return (
        <PostIdPage>
            <PostIdContainer>
                <>
                    <div>{post.published_at}</div>
                    <div>{post.image_url}</div>
                    <div>{post.title}</div>
                    <div>{post.content}</div>
                    <div>{post.author}</div>
                </>
            </PostIdContainer>
        </PostIdPage>
    );
};
const PostIdContainer = styled.div`
    width: 100%;
    flex-direction: column;
`;
const PostIdPage = styled.div`
display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
    margin: 120px 0 120px 0;
    border-radius: 20px;
    i {
        width: 100%;
        height: 50px;
        display: flex;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        margin: 0 20px 5px 20px;
        border-radius: 20px;
    }
    div {
        width: 100%;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }
    p {
    color: black;
        display: flex;
        flex-direction: row;
        background-image: linear-gradient(to top, #76da81, azure);
        height: 50px;
        display: flex;
        font-size: 20px;
        align-items: center;
        justify-content: center;
        margin: 10px 20px 10px 20px;
        border-radius: 10px;
        text-align: center;
        > span {
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        }
        select {
            width: 100%;
            height: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            margin:0
            outline: none;
            border: none;
            text-align-last: center;
            background-color: rgba(255, 255, 0, 0.3);
            cursor: pointer;
            outline: none;
        }
    }
        > * button {
            width:  150px;
            height: 40px;
            border-radius: 10px;
            margin: 0 5px 0 10px;
            outline: none;
            border: none;
            text-align-last: center;
            background-color: rgba(255, 255, 0, 0.3);
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
            > * button:hover {
                background-color: rgba(255, 255, 0, 0.5);
                animation: scale 1s infinite;
                @keyframes scale {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            }`;
