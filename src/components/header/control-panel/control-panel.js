import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
const ControlPanel = styled.div`
    display: flex;
    float: right;
    width: 500px;
    height: 100px;
    text-align: right;
    align-items: center;
    font-size: 15px;
    justify-content: flex-end;
`;

const ControlPanelButton = styled.button`
    background-color: rgba(255, 255, 0, 0);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    &:hover {
        background-color: yellow;
    }
    border: none;
    font-size: 20px;
    margin-right: 10px;
    &: hover {
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
    > * {
        color: black;
        text-decoration: none;
    }
`;
export const StyledControlPanel = ({ clasName }) => {
    const navigate = useNavigate();
    return (
        <ControlPanel className={clasName}>
            <ControlPanelButton title="Назад" onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </ControlPanelButton>
            <ControlPanelButton title="Пользователи">
                <Link to="/users">
                    <i className="fa fa-users" aria-hidden="true"></i>
                </Link>
            </ControlPanelButton>
            <ControlPanelButton title="Создать новую статью">
                <Link to="/post">
                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                </Link>
            </ControlPanelButton>
            <ControlPanelButton title="Войти в аккаунт">
                <Link to="/login">
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                </Link>
            </ControlPanelButton>
        </ControlPanel>
    );
};
