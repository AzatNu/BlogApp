import styled from "styled-components";
import { getUsers } from "../../bff/api";
import {
    selectUserRole,
    selectUpdateUserList,
    selectDeleteButton,
    selectUserLogin,
    selectUserId,
} from "../../selectors/index";
import { ErrorAccess } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRequestChangeUserRole } from "./request-change-role";
import { useRequestDeleteUser } from "./request-delete-user";
import { ROLE } from "../../const";
import { ConfirmationOfDeletion } from "../../components";
import PropTypes from "prop-types";

export const Users = () => {
    const userRole = useSelector(selectUserRole);
    const [usersList, setUsersList] = useState([]);
    const [serch, setSerch] = useState("");
    const dispatch = useDispatch();
    const updateUsersList = useSelector(selectUpdateUserList);
    const deleteButtonClick = useSelector(selectDeleteButton);
    const userLogin = useSelector(selectUserLogin);
    const userId = useSelector(selectUserId);

    useEffect(() => {
        getUsers().then((users) => setUsersList([...users]));
    }, [updateUsersList]);
    const { changeUserRole } = useRequestChangeUserRole();
    const { deleteUser } = useRequestDeleteUser();
    const serchUser = () => {
        const sortedUsers = usersList.filter((user) => {
            return user.login.toLowerCase().includes(serch.toLowerCase());
        });
        if (sortedUsers.length === 0) {
            return setUsersList([...usersList]);
        }
        setUsersList([...sortedUsers]);
    };
    return (
        <UsersContainer>
            {userRole !== ROLE.ADMIN ? (
                <ErrorAccess>
                    Ошибка 403. У вас нет прав для просмотра этой страницы
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
                            <SerchUser>
                                <input
                                    type="text"
                                    value={serch}
                                    onChange={(event) =>
                                        setSerch(event.target.value)
                                    }
                                    placeholder="Поиск по логину пользователя..."
                                />
                                <button
                                    title="Сбросить поиск"
                                    className="fa fa-refresh"
                                    onClick={() => {
                                        setSerch("");
                                        getUsers().then((users) =>
                                            setUsersList([...users])
                                        );
                                    }}
                                ></button>
                                <button
                                    title="Найти пользователя"
                                    className="fa fa-search"
                                    onClick={() => {
                                        serchUser();
                                    }}
                                ></button>
                            </SerchUser>
                            <div>
                                <div>
                                    {" "}
                                    <span>Логин</span>
                                    <span>Дата регистрации</span>
                                    <span>Роль</span>
                                    <span>Настройки</span>
                                </div>
                                {usersList.map((user, index) => (
                                    <User key={index}>
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
                                            {user.login !== userLogin ? (
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
                                                            userLogin:
                                                                user.login,
                                                        });
                                                    }}
                                                ></button>
                                            ) : (
                                                <p>Вы</p>
                                            )}
                                        </span>
                                    </User>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </UsersContainer>
    );
};
const SerchUser = styled.div`
   width: 900px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content:c;
    align-items: center;
    margin: 10px 0 10px 0;
    input {
        display: flex;
        width: 500px;
        height: 50px;
        border-radius: 10px;
        border: none;
        font-size: 20px;
        padding: 0 10px;
        outline: none;
    }
    button {
        display: flex;
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
        font-size: 25px;
        transition: all 0.5s ease;
        margin-left: 20px;
        &:hover {
            animation: shake 0.5s;
            animation-iteration-count: 1;
        }
    }
};
`;
const User = styled.div`
    color: black;
        display: flex;
        flex-direction: row;
        background-image: linear-gradient(to top, #76da81, azure);
        height: 60px;
        display: flex;
        font-size: 20px;
        align-items: center;
        justify-content: center;
        margin: 10px 20px 10px 20px;
        border-radius: 10px;
        text-align: center;
        span {
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
    button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 5px 0 10px;
    outline: none;
    border: none;
    text-align-last: center;
    background-color: rgba(255, 20, 0, 0.7);
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    &:hover {
        background-color: rgba(255, 255, 0);
        animation: shake 0.5s;
        animation-iteration-count: 1;
    }
}
`;
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
        justify-content: start;
        align-items: center;
        justify-content: center;
        div {
            width: 96%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            height: 60px;
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
        }
    }
`;
UsersContainer.propTypes = {
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
    reset: PropTypes.func,
    handleSubmit: PropTypes.func,
    formState: PropTypes.func,
    register: PropTypes.func,
    errors: PropTypes.func,
    users: PropTypes.func,
};
