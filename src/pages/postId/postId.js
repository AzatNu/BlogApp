import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
    selectUserRole,
    selectDeletePostButtonClick,
    selectPostById,
    selectIsLoading,
    selectRefreshPost,
    selectCreateButtonClicked
} from "../../selectors";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../bff/api";
import { useEffect, useState } from "react";
import { ConfirmationOfDeletion, ErrorAccess, Loader } from "../../components";
import { ROLE } from "../../const";
import {
    useRequestDeletePost,
    useRequestCreateComment,
    useRequestDeleteComment
} from "./requests";
import PropTypes from "prop-types";

export const PostId = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const [comment, setComment] = useState("");
    const roleId = useSelector(selectUserRole);
    const deletePostButtonClick = useSelector(selectDeletePostButtonClick);
    const post = useSelector(selectPostById);
    const isLoading = useSelector(selectIsLoading);
    const refreshPost = useSelector(selectRefreshPost);
    const createButtonClicked = useSelector(selectCreateButtonClicked);
    useEffect(() => {
        dispatch(getPost(postId))
    }, [!refreshPost]);
    const { requestDeletePost } = useRequestDeletePost();
    const { requestCreateComment } = useRequestCreateComment();
    const { requestDeleteComment } = useRequestDeleteComment();
    return (
        <PostIdPage>
            <PostIdContainer>
                {deletePostButtonClick ? (
                    <ConfirmationOfDeletion>
                        <h3>
                            Вы действительно хотите удалить публикацию:{" "}
                            {post.title}? За авторством: {post.author}
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
                        {post?.id === undefined ? (
                            <ErrorAccess>
                                Ошибка 404. Указанная вами публикация не найдена
                            </ErrorAccess>
                        ) : (
                            <>
                                {isLoading ? (<Loader />) : (<Header>
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
                                                {new Date(post.published_at).toLocaleDateString("ru-RU")}
                                            </p>
                                            <p style={{ marginLeft: "20px" }}>
                                                <b>Автор публикации:</b> <br />
                                                {post.author}
                                            </p>
                                            {roleId === ROLE.ADMIN ||
                                                roleId === ROLE.MODERATOR ? (
                                                <>
                                                    <Link
                                                        to={`/post/${postId}/edit`}
                                                    >
                                                        <button
                                                            style={{
                                                                marginLeft:
                                                                    "40px",
                                                            }}
                                                            className="fa fa-pencil"
                                                            title="Редактировать публикацию"
                                                        ></button>
                                                    </Link>
                                                    <button
                                                        style={{
                                                            marginLeft: "11px",
                                                        }}
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
                                </Header>)}
                                {isLoading ? (<Loader />) : (<Content>
                                    <p
                                        style={{
                                            overflowWrap: "break-word",
                                        }}
                                    >
                                        {post.content}
                                    </p>
                                </Content>)}
                                {isLoading ? (<Loader />) : (<Comments>
                                    <h2>Комментарии к публикации:</h2>
                                    <div>
                                        {roleId === ROLE.GUEST ? (
                                            <p>
                                                Авторизируйтесь, чтобы иметь
                                                возможность оставлять свои
                                                комментарии к публикациям
                                            </p>
                                        ) : (
                                            <div>
                                                <textarea
                                                    value={comment}
                                                    placeholder="Ваш комментарий..."
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <span
                                                    style={{
                                                        fontSize: "15px",
                                                        color: "#999",
                                                    }}
                                                >
                                                    {comment.length} / 400
                                                    символов
                                                </span>
                                            </div>
                                        )}
                                        {roleId === ROLE.GUEST ? null : (
                                            <button
                                                title="Отправить комментарий"
                                                className="fa fa-send"
                                                disabled={
                                                    roleId === ROLE.GUEST ||
                                                    comment.length === 0 ||
                                                    comment.length > 400 ||
                                                    createButtonClicked
                                                }
                                                onClick={() => {
                                                    dispatch(
                                                        requestCreateComment(
                                                            comment,
                                                            postId
                                                        )
                                                    );
                                                }}
                                            ></button>
                                        )}
                                    </div>
                                    {post.comments?.length === 0 ? (
                                        <h2>
                                            Комментарии к данной публикации
                                            отсутствуют
                                        </h2>
                                    ) : (
                                        post.comments?.map((comment, index) => (
                                            <div key={index}>
                                                <h2>{comment.author.login}</h2>
                                                <span>
                                                    {new Date(comment.published_at).toLocaleString("ru")}
                                                </span>
                                                <p>{comment.content}</p>
                                                {roleId === ROLE.ADMIN ||
                                                    roleId === ROLE.MODERATOR ? (
                                                    <button
                                                        title="Удалить комментарий"
                                                        className="fa fa-trash"
                                                        onClick={() => {
                                                            dispatch(requestDeleteComment(postId, comment.id));
                                                        }
                                                        }
                                                    ></button>
                                                ) : null}
                                            </div>
                                        ))
                                    )}
                                </Comments>)}
                            </>
                        )}
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
        word-wrap: break-word;
        max-width: 900px;
    }
    h2 {
        margin: 0px 0px 10px 25px;
        font-size: 25px;
        word-wrap: break-word;
        max-width: 900px;
    }
    textarea {
        width: 880px;
        height: 100px;
        margin: 10px 20px 0px 20px;
        border-radius: 10px;
        border: none;
        background-image: linear-gradient(to top, #76da81, azure);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        padding: 10px;
        font-size: 20px;
        outline: none;
        resize: none;
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
    margin: 120px 10px 120px 10px;
`;
PostIdPage.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    urlImg: PropTypes.string,
    userLogin: PropTypes.string,
};
