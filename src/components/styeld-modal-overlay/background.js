import styled from "styled-components";
export const AuthorizationBackground = styled.div`
    display: flex;
    position: absolute;
    width: 1000px;
    height: 1000px;
    z-index: 1;
    backdrop-filter: blur(7px);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
