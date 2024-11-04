import styled from "styled-components";

const InformationBlock = styled.div`
    display: flex;
    width: 400px;
    height: 110px;
    margin-right: 20px;
    border-radius: 20px;
    overflow-wrap: break-word;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    > p {
        font-size: 15px;
        margin: 5px 10px 5px 5px;
        line-height: 1;
        text-align: center;
        word-wrap: break-word;
        display: flex;
        align-items: start;
        justify-content: center;
    }
    > h3 {
        width: 100%;
        font-size: 15px;
        margin: 5px 20px 5px 20px;
        line-height: 1;
        text-align: center;
    }
`;

export const Information = () => {
    return (
        <InformationBlock>
            <h3>Обратная связь:</h3>
            <p>
                <i className="fa fa-phone"></i> +7 (999) 999-99-99
            </p>
            <p>
                <i className="fa fa-envelope"></i> 7LxkA@example.com
            </p>
            <p>
                <i className="fa fa-telegram"></i> @7LxkA
            </p>
            <p>
                <i className="fa fa-skype"></i> 7LxkA
            </p>
            <p>
                <i className="fa fa-whatsapp"></i> +7 (999) 999-99-99
            </p>
        </InformationBlock>
    );
};
