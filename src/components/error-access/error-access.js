import styled from "styled-components";
export  const ErrorAccess = styled.div`
display: flex;
position: fixed;
top: 45%;
right: 0;
left: 0;
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
