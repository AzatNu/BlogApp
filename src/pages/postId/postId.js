import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectUserRole, selectDeletePostButtonClick } from "../../selectors";
import {  useParams } from "react-router-dom";
import { getPost } from "../../bff/api";
import { useEffect, useState } from "react";
import { ConfirmationOfDeletion } from "../../components";
import { ROLE } from "../../const";
import { useRequestDeletePost } from "./request-delete-post";
export const PostId = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const roleId = useSelector(selectUserRole);
    const deletePostButtonClick = useSelector(selectDeletePostButtonClick);

    useEffect(() => {
        getPost(postId).then((data) => setPost(data));
    }, [])
const {requestDeletePost} = useRequestDeletePost();

    return (
        <PostIdPage>
            <PostIdContainer>
                {deletePostButtonClick ? (
                    <ConfirmationOfDeletion>
                        <h3>
                            Вы действительно хотите удалить публикацию: {post.title}? За авторством {post.author}<br/>
                            Это действие необратимо.
                        </h3>
                        <span>
                            <button
                                className="fa fa-check"
                                title="согласен"
                                onClick={() => {dispatch(requestDeletePost(postId))}}
                            ></button>
                            <button
                                className="fa fa-times"
                                title="отказать"
                                onClick={() => {
                                    dispatch({
                                        type: "SET_DELETE_POST_BUTTON_CLICK",
                                        deletePostButtonClick:
                                            !deletePostButtonClick,
                                    });
                                }}
                            ></button>
                        </span>
                    </ConfirmationOfDeletion>
                ) : (
                    <>
                        <Header>
                            <img src={post.image_url} alt="post" />
                            <div>
                                <h3>{post.title}</h3>
                                <div>
                                    <p>
                                        <b>Дата публикации:</b>
                                        <br />
                                        {post.published_at}
                                    </p>
                                    <p>
                                        <b>Автор публикации:</b> <br />
                                        {post.author}
                                    </p>
                                    {(roleId === ROLE.ADMIN ||
                                        roleId === ROLE.MODERATOR) && (
                                        <button
                                            className="fa fa-trash"
                                            title="Удалить публикацию"
                                            onClick={() =>
                                                dispatch({
                                                    type: "SET_DELETE_POST_BUTTON_CLICK",
                                                    deletePostButtonClick:
                                                        !deletePostButtonClick,
                                                })
                                            }
                                        ></button>
                                    )}
                                </div>
                            </div>
                        </Header>
                        <Content>
                            <p>{post.content}</p>
                        </Content>
                        <Comments><h3>Комментарии</h3>
                        <div></div></Comments>
                    </>
                )}
            </PostIdContainer>
        </PostIdPage>
    );
};
const Comments = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    margin: 0px 20px 0px 20px;
    font-size: 25px;
    line-height: 1.5;
    background-image: linear-gradient(to top, #76da81, azure);
    border-radius: 10px;
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    margin: 10px 20px 20px 20px;
    font-size: 25px;
    line-height: 1.5;
    background-image: linear-gradient(to top, #76da81, azure);
    border-radius: 10px;
    p {
        margin: 10px 20px 20px 20px;
    }
`;
const Header = styled.div`
    margin: 20px 20px 0px 20px;
    height: 200px;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    color: black;
    border-radius: 10px;
    align-items: center;
    img {
        border-radius: 10px;
        width: 350px;
        height: 205px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        margin: 0px 0px 0px 0px;
    }
    div {
        margin: 0px 0px 0px 5px;
        display: flex;
        flex-direction: column;
        h3 {
            height: 100px;
            margin: 0px 0px 5px 0px;
            font-size: 25px;
            align-items: center;
            display: flex;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            padding: 10px;
            background-image: linear-gradient(to top, #76da81, azure);
            border-radius: 10px;
        }
        div {
            display: flex;
            width: 545px;
            justify-content: space-between;
            flex-direction: row;
            margin: 0 auto;
            background-image: linear-gradient(to top, #76da81, azure);
            border-radius: 10px;
            padding: 10px;
            button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                outline: none;
                border: none;
                text-align-last: center;
                background-image: linear-gradient(to top, #76da81, azure);
                cursor: pointer;
                color: black;
                justify-content: center;
                align-items: center;
                margin: 0;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
                border: none;
                font-size: 20px;
                margin-right: 10px;
                &:hover {
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
                }
            }
        }
    }
    p {
        margin: 0px 0px 5px 0px;
    }
`;

const PostIdContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    border-radius: 20px;
`;
const PostIdPage = styled.div`
    wdith: 100%;
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
    margin: 120px 20px 120px 20px;
    border-radius: 20px;
`;
