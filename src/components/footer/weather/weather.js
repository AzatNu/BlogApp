import { useEffect, useState } from "react";
import { weatherErrorMessage } from "../../../const";
import styled from "styled-components";
const errorMessage = weatherErrorMessage[0];
const Weather = styled.div`
    width: 400px;
    height: 110px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    background-color: white;
    margin-left: 20px;
    font-size: 10px;
    align-items: center;
    justify-content: center;

    > * h2 {
        margin: 0px 10px 10px 20px;
    }
    > * p {
        width: 350px;
        font-size: 15px;
        margin: 0 10px 10px 20px;
    }
`;
const Loader = styled.div`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    animation: load 1s infinite;
    border: 5px dashed green;
    @keyframes load {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const WeatherBlock = () => {
    const [city, setCity] = useState("");
    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lang=ru&q=Kazan&appid=5f188283df126b30c5228bf78a6fd988`
        )
            .then((response) => response.json())
            .then(({ name, main, weather }) => {
                setCity(name);
                setTemp(Math.round(main.temp - 273.15));
                setDescription(weather[0].description);
                setError(false);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);
    const date = new Date().toLocaleString("ru", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <Weather>
            {loading ? (
                <Loader />
            ) : (
                <p>
                    <h2>{error ? `${errorMessage}` : `${city}, ${date}  `}</h2>
                    <p>
                        Температура: {error ? `${errorMessage}` : `${temp}°C`}
                    </p>
                    <p>Описание: {error ? `${errorMessage}` : description}</p>
                </p>
            )}
        </Weather>
    );
};
