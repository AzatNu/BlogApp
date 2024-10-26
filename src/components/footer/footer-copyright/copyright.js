import styled from "styled-components";
import { Link } from "react-router-dom";
const MenuItem = styled.div``;
const Copyright = styled.div`
    display: flex;
    width: 200px;
    height: 110px;
    flex-direction: column;
    justify-content: center;
    > p {
        text-align: center;
        font-size: 15px;
    }
`;
export const CopyrightBlock = () => {
    return (
        <Copyright>
            <p>
                Все права защищены,
                <br />© 2024-2025
            </p>
        </Copyright>
    );
};
