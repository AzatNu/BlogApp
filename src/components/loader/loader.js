import styled from "styled-components";
export const Loader = styled.p`
    position: absolute;
    top: 50%;
    left: 49%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 10px solid green;
    border-top: 10px solid #333;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
