import styled from "styled-components";
export const ConfirmationOfDeletion = styled.div`
    display: flex;
    justify-content: center;
    color: black;
    height: 200px;
    width: 800px;
    margin: 120px 0 120px 0px;
    flex-direction: column;
    align-items: center;
    h3 {
        width: 800px;
        color: black;
        font-size: 25px;
        border-radius: 10px;
        padding: 40px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        background-image: linear-gradient(to top, #76da81, azure);
        text-align: center;
        line-height: 1.5;
        word-wrap: break-word;    }
    button {
        background: yellow;
        width: 200px;
        height: 50px;
        margin: 10px;
        border-radius: 10px;
        font-size: 25px;
        outline: none;
        cursor: pointer;
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
