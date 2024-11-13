import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
    selectUserRole,
    selectDeletePostButtonClick,
    selectUserLogin,
} from "../../selectors";
import { Link, useParams } from "react-router-dom";
import { getPost, getComments } from "../../bff/api";
import { useEffect, useState } from "react";
import { ConfirmationOfDeletion } from "../../components";
import { ROLE } from "../../const";
import {
    useRequestDeletePost,
    useRequestDeleteComment,
    useRequestCreateComment,
} from "./requests";

export const PostId = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const roleId = useSelector(selectUserRole);
    const deletePostButtonClick = useSelector(selectDeletePostButtonClick);
    const userLogin = useSelector(selectUserLogin);
    useEffect(() => {
        getPost(postId).then((data) => setPost(data));
    }, []);
    useEffect(() => {
        getComments(postId).then((data) => {
            setComments(data.filter((comment) => comment.post_id === postId));
        });
    }, [comment, comments, postId]);
    const { requestDeletePost } = useRequestDeletePost();
    const { requestDeleteComment } = useRequestDeleteComment();
    const { requestCreateComment } = useRequestCreateComment();

    return (
        <PostIdPage>
            <PostIdContainer>
                {deletePostButtonClick ? (
                    <ConfirmationOfDeletion>
                        <h3>
                            Вы действительно хотите удалить публикацию:{" "}
                            {post.title}? За авторством:{" "}{post.author}
                            <br />
                            Это действие необратимо.
                        </h3>
                        <span>
                            <button
                                className="fa fa-check"
                                title="согласен"
                                onClick={() => {
                                    dispatch(requestDeletePost(postId));
                                }}
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
                                <h3
                                    style={{
                                        maxWidth: "580px",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {post.title}
                                </h3>
                                <div>
                                    <p>
                                        <b>Дата публикации:</b>
                                        <br />
                                        {post.published_at}
                                    </p>
                                    <p style={{ marginLeft: "20px" }}>
                                        <b>Автор публикации:</b> <br />
                                        {post.author}
                                    </p>
                                    {roleId === ROLE.ADMIN ||
                                    roleId === ROLE.MODERATOR ? (
                                        <>
                                            {" "}
                                            <Link to={`/post/${postId}/edit`}>
                                                <button
                                                    style={{
                                                        marginLeft: "81px",
                                                    }}
                                                    className="fa fa-pencil"
                                                    title="Редактировать публикацию"
                                                ></button>
                                            </Link>
                                            <button
                                                style={{ marginLeft: "11px" }}
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
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </Header>
                        <Content>
                            <p
                                style={{
                                    overflowWrap: "break-word",
                                }}
                            >
                                {post.content}
                            </p>
                        </Content>
                        <Comments>
                            <h2>Комментарии к публикации:</h2>
                            {comments.length === 0 ? (
                                <h2>
                                    Комментарии к данной публикации отсутствуют
                                </h2>
                            ) : (
                                comments.map((comment, index) => (
                                    <div key={index}>
                                        <h2>{comment.author}</h2>
                                        <span>{comment.published_at}</span>
                                        <p>{comment.content}</p>
                                        {roleId === ROLE.ADMIN ||
                                        roleId === ROLE.MODERATOR ? (
                                            <button
                                                title="Удалить комментарий"
                                                className="fa fa-trash"
                                                onClick={() =>
                                                    dispatch(
                                                        requestDeleteComment(
                                                            comment.id
                                                        )
                                                    )
                                                }
                                            ></button>
                                        ) : null}
                                    </div>
                                ))
                            )}
                            <div>
                                {roleId === ROLE.GUEST ? (
                                    <p>
                                        Авторизируйтесь, чтобы иметь возможность
                                        оставлять свои комментарии к публикациям
                                    </p>
                                ) : (
                                    <div>
                                        <textarea
                                            value={comment}
                                            placeholder="Ваш комментарий"
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                        />
                                    </div>
                                )}
                                {roleId === ROLE.GUEST ? null : (
                                    <button
                                        title="Отправить комментарий"
                                        className="fa fa-send"
                                        disabled={
                                            roleId === ROLE.GUEST ||
                                            comment.length === 0
                                        }
                                        onClick={() => {
                                            dispatch(
                                                requestCreateComment(
                                                    comment,
                                                    postId,
                                                    userLogin
                                                )
                                            );
                                            setComment("");
                                        }}
                                    ></button>
                                )}
                            </div>
                        </Comments>
                    </>
                )}
            </PostIdContainer>
        </PostIdPage>
    );
};
const Comments = styled.div`
    display: flex;
    flex-direction: column;
    color: black;
    margin: 0px 20px 0px 20px;
    font-size: 25px;
    line-height: 1.5;
    background-image: linear-gradient(to top, #76da81, azure);
    border-radius: 10px;
    i {
        margin: 5px 20px 0px 25px;
        font-size: 30px;
        cursor: pointer;
    }
    span {
        margin: 10px 20px 0px 25px;
        font-size: 20px;
    }
    p {
        margin: 10px 20px 10px 20px;
        border: 5px solid white;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    }
    h2 {
        width: 100%;
        margin: 10px 20px 0px 25px;
        font-size: 25px;
    }
    textarea {
        width: 900px;
        height: 100px;
        margin: 20px 20px 0px 20px;
        border-radius: 10px;
        border: none;
        background-image: linear-gradient(to top, #76da81, azure);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        padding: 10px;
        font-size: 20px;
        outline: none;
    }
    div {
        button {
            width: 50px;
            height: 50px;
            margin: 0px 20px 40px 20px;
            border-radius: 50px;
            border: none;
            background-image: linear-gradient(to top, #76da81, azure);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            padding: 10px;
            font-size: 20px;
            cursor: pointer;
            outline: none;
            &:hover {
                animation: shake 0.5s;
                animation-iteration-count: infinite;
            }
        }
    }
    button {
        width: 50px;
        height: 50px;
        margin: 0px 20px 10px 20px;
        border-radius: 50px;
        border: none;
        background-image: linear-gradient(to top, #76da81, azure);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        padding: 10px;
        font-size: 20px;
        cursor: pointer;
        outline: none;
        &:hover {
            animation: scale 1s infinite;
            @keyframes scale {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
                100% {
                    transform: scale(1);
                }
            }
        }
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    margin: 10px 20px 10px 20px;
    font-size: 25px;
    line-height: 1.5;
    background-image: linear-gradient(to top, #76da81, azure);
    border-radius: 10px;
    p {
        margin: 10px 20px 20px 20px;
        max-width: 925px;
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
        margin: 0px 0px 0px 10px;
        display: flex;
        flex-direction: column;
        h3 {
            height: 100px;
            margin: 0px 0px 5px 0px;
            font-size: 25px;
            padding: 10px;
            border-radius: 10px;
            color: white;
            word-wrap: break-word;
        }
        div {
            display: flex;
            flex-direction: row;
            margin: 0px 0px 0px 0px;
            border-radius: 10px;
            padding: 10px;
            color: white;
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
                border: none;
                font-size: 20px;
                &:hover {
                    animation: shake 0.5s;
                    animation-iteration-count: infinite;
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
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
    margin: 120px 20px 120px 20px;
`;
