import styled from "styled-components";
const InformationBlock = styled.div`
    width: 400px;
    height: 110px;
    margin: 20px;
    border-radius: 20px;
    background-color: rgba(128, 128, 128, 0.8);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    > p {
        width: 200px;

        font-size: 15px;
        margin: 10px 10px 5px 20px;
        line-height: 1;
    }
`;
export const Information = () => {
    return (
        <InformationBlock>
            <p>Служба поддержки:</p>
            <p>
                <i className="fa fa-phone"></i> +7 (999) 999-99-99
            </p>
            <p>
                <i className="fa fa-envelope"></i> 7LxkA@example.com
            </p>
            <p>
                <i className="fa fa-telegram"></i> @7LxkA
            </p>
        </InformationBlock>
    );
};
