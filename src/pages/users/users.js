import styled from "styled-components";
import { getUsers } from "../../bff/api";
import {
    selectUserRole,
    selectUpdateUserList,
    selectDeleteButton,
    selectDeleteUserLogin,
    selectUserId,
} from "../../selectors/index";
import { ErrorAccess } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRequestChangeUserRole } from "./request-change-role";
import { useRequestDeleteUser } from "./request-delete-user";
import { ROLE } from "../../const";
import { ConfirmationOfDeletion } from "../../components";

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
            {userRole !== ROLE.ADMIN ? (
                <ErrorAccess>
                    У вас нет прав для просмотра этой страницы
                </ErrorAccess>
            ) : (
                <>
                    {}
                    {deleteButtonClick ? (
                        <ConfirmationOfDeletion>
                            <h3>
                                Вы действительно хотите удалить пользователя{" "}
                                <b>{userLogin}</b>?<br />
                                Это действие необратимо.
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
                            <h1 className="fa fa-users" aria-hidden="true">
                                &nbsp;Пользователи
                            </h1>
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



const UsersContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
      margin: 120px 0 120px 0;
    h1 {
        width: 100%;
        height: 50px;
        display: flex;
        font-size: 30px;
        justify-content: center;
        align-items: center;
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
            background-color: rgba(255, 255, 0, 0.8);
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
            > * button:hover {
                background-color: rgba(255, 255, 0);
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
