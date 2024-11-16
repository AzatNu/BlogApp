import styled from "styled-components";

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
const Copyright = styled.div`
    display: flex;
    width: 200px;
    height: 110px;
    flex-direction: column;
    justify-content: center;
    > p {
        text-align: center;
        font-size: 10px;
    }
`;
