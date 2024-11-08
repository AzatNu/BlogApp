import styled from "styled-components";
export const StyledAuthorization = styled.div`
    position: fixed;
    z-index: 3;
    width: 400px;
    height: 550px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
background-image: linear-gradient(to top, #76da81, azure);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    h2 {
        font-size: 30px;
        margin: 0;
        position: absolute;
        top: 10px;
        margin-top: 10px;
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        width: 100%;
        height: 70%;
    }
    input {
        width: 300px;
        height: 40px;
        margin: 30px 0 5px 0;
        border-radius: 10px;
        border: none;
        font-size: 20px;
        padding: 0 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        outline: none;
    }
    span {
        display: flex;
        width: 320px;
        height: 50px;
        color: red;
        font-size: 15px;
        margin: 30px 0 0px 0;
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
    button {
        width: 100%;
        height: 50px;
        margin: 10px 0 0 0;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border: none;
        font-size: 20px;
        background-color: yellow;
        cursor: pointer;
        position: absolute;
        bottom: 0;
        &:hover {
            background-color: green;
        }
            color: black;
    }
    p {
        font-size: 15px;
        cursor: pointer;
        text-align: center;
    }
    i {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 30px;
        cursor: pointer;
        color: red;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        animation 1s infinite background-color;
        display: flex;
        &:hover {
            background-color: red;
            color: white;
        }
    }
`;
