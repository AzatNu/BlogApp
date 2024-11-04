import styled from "styled-components";
import { WeatherBlock } from "./weather";
import { Information } from "./footer-information";
import { CopyrightBlock } from "./footer-copyright";

const Footer = ({ className }) => (
    <div className={className}>
        <WeatherBlock />
        <CopyrightBlock />
        <Information />
    </div>
);

export const StyledFooter = styled(Footer)`
    display: flex;
    width: 1000px;
    height: 120px;
    background-image: linear-gradient(to top, #76da81, azure);
    align-items: center;
    font-size: 15px;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 0;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    margin: 0 auto;
    > *:last-child {
        margin-left: auto;
    }
    z-index: 0;
`;
