import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ErrorAccess } from "../../components";
import { selectUserRole, selectUserLogin, selectPostById } from "../../selectors";
import { ROLE } from "../../const";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useRequestUpdatePostId } from "./request-update-post-id";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { getPost } from "../../bff/api";

const editPostFormSchema = yup.object().shape({
    title: yup
        .string()
        .required(`*Заголовок обязателен для заполнения`)
        .min(10, `*Заголовок должен содержать минимум 10 символа`)
        .max(110, `*Заголовок должен содержать максимум 110 символов`),
    content: yup
        .string()
        .required(`*Текст статьи обязателен для заполнения`)
        .min(200, `*Текст статьи должен содержать минимум 200 символов`)
        .max(15000, `*Текст статьи должен содержать максимум 15000 символов`),
    image: yup
        .string()
        .required(`*Загрузите изображение`)
        .matches(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            "*Неправильная ссылка"
        ),
});

export const PostEdit = () => {
    const post = useSelector(selectPostById);
    const { postId } = useParams();
    const dispatch = useDispatch();
    const userRole = useSelector(selectUserRole);
    const userLogin = useSelector(selectUserLogin);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            title: post.title || "",
            content: post.content || "",
            image: post.image_url || "",
        },
        resolver: yupResolver(editPostFormSchema),
    });

    const { requestUpdatePostId } = useRequestUpdatePostId();

    const onSubmit = (data) => {
        dispatch(
            requestUpdatePostId(postId, data.title, data.content, data.image, userLogin)
        );
    };

    const formError = errors?.title?.message || errors?.content?.message || errors?.image?.message;

    const clearField = (field) => setValue(field, "");

    return (
        <PostEditPage>
            {userRole !== ROLE.MODERATOR && userRole !== ROLE.ADMIN ? (
                <ErrorAccess>
                    Ошибка 403. У вас нет прав для просмотра этой страницы
                </ErrorAccess>
            ) : (
                <>
                    <h1 className="fa fa-pencil"> Редактор статьи</h1>
                    <PostEditContainer>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2>Заголовок</h2>
                            <input
                                type="text"
                                placeholder="Напишите заголовок статьи"
                                {...register("title")}
                                onBlur={() => {}}
                            />
                            <button
                                type="button"
                                title="Очистить заголовок"
                                onClick={() => clearField("title")}
                            >
                                Очистить
                            </button>
                            <h2>Изображение</h2>
                            <input
                                type="text"
                                placeholder="Вставьте ссылку на изображение"
                                {...register("image")}
                                onBlur={() => {}}
                            />
                            <button
                                type="button"
                                title="Очистить изображение"
                                onClick={() => clearField("image")}
                            >
                                Очистить
                            </button>
                            <h2>Текст статьи</h2>
                            <textarea
                                placeholder="Напишите текст статьи"
                                {...register("content")}
                                onBlur={() => {}}
                            />
                            <button
                                type="button"
                                title="Очистить текст"
                                onClick={() => clearField("content")}
                            >
                                Очистить
                            </button>
                            <p>Вы подпишитесь как: {userLogin}</p>
                            {formError && <span>{formError}</span>}
                            <button type="submit" disabled={!!formError}>
                                Сохранить изменения
                            </button>
                        </form>
                    </PostEditContainer>
                </>
            )}
        </PostEditPage>
    );
};

const PostEditContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    border-radius: 10px;
    background-image: linear-gradient(to top, #76da81, azure);
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px 20px 20px 20px;
        font-size: 25px;
        line-height: 1.5;
        input {
            display: flex;
            width: 900px;
            height: 50px;
            margin: 20px 20px 20px 20px;
            border-radius: 10px;
            border: none;
            font-size: 20px;
            padding: 0 10px;
            outline: none;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
        button {
            background: yellow;
            width: 200px;
            height: 50px;
            margin: 10px;
            border-radius: 10px;
            font-size: 20px;
            outline: none;
            cursor: pointer;
            border: none;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            &:hover {
                animation: shake 0.5s;
                animation-iteration-count: infinite;
            }
        }
        span {
            display: flex;
            width: 500px;
            height: 100px;
            color: red;
            font-size: 20px;
            background-color: rgba(256, 100, 100, 0.5);
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            animation: shake 0.5s ease-in-out;
            @keyframes shake {
                0% {
                    transform: translateX(0);
                }
                25% {
                    transform: translateX(-5px);
                }
                50% {
                    transform: translateX(5px);
                }
                75% {
                    transform: translateX(-5px);
                }
                100% {
                    transform: translateX(0);
                }
            }
        }
    }
    h2 {
        font-size: 20px;
        margin: 0;
    }
    textarea {
        display: flex;
        width: 900px;
        height: 400px;
        margin: 20px 20px 20px 20px;
        border-radius: 10px;
        border: none;
        font-size: 20px;
        padding: 0 10px;
        outline: none;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        background-image: linear-gradient(to top, #76da81, azure);
    }
`;
const PostEditPage = styled.div`
    wdith: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
    margin: 120px 20px 120px 20px;
    border-radius: 20px;
    h1 {
        font-size: 30px;
    }
`;
PostEdit.propTypes = {
    postId: PropTypes.string,
    userLogin: PropTypes.string,
};
