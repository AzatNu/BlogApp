import styled from "styled-components";
import { getUsers } from "../../bff/api";
import {
    selectUserRole,
    selectUpdateUserList,
    selectDeleteButton,
    selectDeleteUserLogin,
    selectUserId,
} from "../../selectors/index";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRequestChangeUserRole } from "./request-change-role";
import { useRequestDeleteUser } from "./request-delete-user";

export const Users = () => {
    const userRole = useSelector(selectUserRole);
    const [usersList, setUsersList] = useState([]);
    const dispatch = useDispatch();
    const updateUsersList = useSelector(selectUpdateUserList);
    const deleteButtonClick = useSelector(selectDeleteButton);
    const userLogin = useSelector(selectDeleteUserLogin);
    const userId = useSelector(selectUserId);

    useEffect(() => {
        getUsers().then((users) => setUsersList([...users]));
    }, [updateUsersList]);
    const { changeUserRole } = useRequestChangeUserRole();
    const { deleteUser } = useRequestDeleteUser();
    return (
        <UsersContainer>
            {userRole !== "0" ? (
                <ErrorAccess>
                    У вас нет прав для просмотра этой страницы
                </ErrorAccess>
            ) : (
                <>
                    {deleteButtonClick ? (
                        <ConfirmationOfDeletion>
                            <h3>
                                Вы действительно хотите удалить пользователя{" "}
                                {userLogin}?
                            </h3>
                            <span>
                                <button
                                    className="fa fa-check"
                                    title="согласен"
                                    onClick={() => {
                                        dispatch(deleteUser(userId));
                                        dispatch({
                                            type: "DELETE_USER_BUTTON_CLICK",
                                            deleteButtonClick:
                                                !deleteButtonClick,
                                        });
                                        dispatch({
                                            type: "SET_USER_ID",
                                            userId: "",
                                        });
                                    }}
                                ></button>
                                <button
                                    className="fa fa-times"
                                    title="отказать"
                                    onClick={() => {
                                        dispatch({
                                            type: "SET_USER_ID",
                                            userId: "",
                                        });
                                        dispatch({
                                            type: "DELETE_USER_BUTTON_CLICK",
                                            deleteButtonClick:
                                                !deleteButtonClick,
                                        });
                                    }}
                                ></button>
                            </span>
                        </ConfirmationOfDeletion>
                    ) : (
                        <>
                            <i className="fa fa-users" aria-hidden="true">
                                &nbsp;Пользователи
                            </i>
                            <div>
                                <p>
                                    <span>Логин</span>
                                    <span>Дата регистрации</span>
                                    <span>Роль</span>
                                    <span>Настройки</span>
                                </p>
                                {usersList.map((user, index) => (
                                    <p key={index}>
                                        <span>{user.login}</span>
                                        <span>{user.registred_at}</span>
                                        <select
                                            value={user.role_id}
                                            onChange={(event) => {
                                                dispatch(
                                                    changeUserRole(
                                                        user.id,
                                                        event.target.value
                                                    )
                                                );
                                            }}
                                        >
                                            <option value="0">
                                                Администратор
                                            </option>
                                            <option value="1">Модератор</option>
                                            <option value="2">
                                                Пользователь
                                            </option>
                                        </select>
                                        <span>
                                            <button
                                                className="fa fa-user-times"
                                                title="удалить пользователя"
                                                onClick={() => {
                                                    dispatch({
                                                        type: "DELETE_USER_BUTTON_CLICK",
                                                        deleteButtonClick:
                                                            !deleteButtonClick,
                                                    });
                                                    dispatch({
                                                        type: "SET_USER_ID",
                                                        userId: user.id,
                                                    });
                                                    dispatch({
                                                        type: "SET_USER_LOGIN",
                                                        userLogin: user.login,
                                                    });
                                                }}
                                            ></button>
                                        </span>
                                    </p>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </UsersContainer>
    );
};

const ConfirmationOfDeletion = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-image: linear-gradient(to top, #76da81, azure);
    color: black;
    margin: 130px 50px 20px 50px;
    border-radius: 20px;
    h3 {
        font-size: 25px;
        margin: 20px 0 20px 0;
    }
    button {
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 50px;
        margin: 10px;
        border-radius: 10px;
        font-size: 25px;
    }
`;

const ErrorAccess = styled.div`
    display: flex;
    position: fixed;
    top: 45%;
    height: 100px;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: 35px;
    border-radius: 10px;
    animation: shake 0.7s ease-in-out;
    color: red;
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
`;
const UsersContainer = styled.div`
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
            }
`;
