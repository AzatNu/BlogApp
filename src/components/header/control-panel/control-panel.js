import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROLE } from "../../../const";
import {
    selectUserRole,
    selectUserLogin,
    selectUserSession,
} from "../../../selectors";
import { logout } from "../../../bff/actions";

export const StyledControlPanel = ({ clasName }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);
    const session = useSelector(selectUserSession);
    const onLogout = () => {
        dispatch(logout(session));
        sessionStorage.removeItem("userData");
    }
    return (

        <ControlPanel className={clasName}>
            <StyledUserLogin title={`Вы авторизовались как ${login}`}>
                {login}
            </StyledUserLogin>
            <ControlPanelButton title="Назад" onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </ControlPanelButton>
            <Link to="/users" style={{ textDecoration: "none" }}>
                {roleId === ROLE.ADMIN ? (
                    <ControlPanelButton
                        title="Пользователи"
                        disabled={roleId !== ROLE.ADMIN}
                    >
                        <i className="fa fa-users" aria-hidden="true"></i>
                    </ControlPanelButton>
                ) : null}
            </Link>
            <Link to="/post">
                <ControlPanelButton title="Статьи">
                    <i className="fa fa-file-text" aria-hidden="true"></i>
                </ControlPanelButton>
            </Link>
            <Link to="/postCreate">
                {roleId === ROLE.ADMIN || roleId === ROLE.MODERATOR ? (
                    <ControlPanelButton title="Создать статью">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </ControlPanelButton>
                ) : null}
            </Link>
            {roleId === ROLE.GUEST ? (
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <ControlPanelButton
                        title="Войти в аккаунт"
                        style={{ backgroundColor: "green" }}
                    >
                        <i className="fa fa-sign-in" aria-hidden="true"></i>
                    </ControlPanelButton>
                </Link>
            ) : (
                <ControlPanelButton
                    title="Выйти из аккаунта"
                    style={{ backgroundColor: "#FF6347" }}
                    onClick={() => {
                        onLogout();
                    }}
                >
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                </ControlPanelButton>
            )}
        </ControlPanel>
    );
};
const ControlPanel = styled.div`
    display: flex;
    float: right;
    width: 500px;
    height: 100px;
    align-items: center;
    font-size: 15px;
    justify-content: flex-end;
    > a {
           text-decoration: none;
    }
`;

const ControlPanelButton = styled.button`
    background-color: rgba(255, 255, 0, 0);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: yellow;
    }
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
`;

const StyledUserLogin = styled.div`
    margin-right: 20px;
    font-size: 30px;
`;
