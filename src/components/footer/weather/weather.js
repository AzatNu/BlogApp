import { useEffect, useState } from "react";
import styled from "styled-components";
const Weather = styled.div`
    width: 400px;
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    background-color: rgba(128, 128, 128, 0.8);
    margin-left: 20px;
    font-size: 10px;
    > * {
        text-align: left;
    }
    > * h2 {
        margin: 10px 10px 5px 20px;
    }
    > * p {
        margin-left: 10px;
        font-size: 15px;
        margin: 5px 10px 10px 20px;
    }
`;
const LoadingSpiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
    width: 1000px;
    margin: 5px 10px 10px 20px;
    font-size: 10px;
    width: 10px;
    height: 10px;
    border: 10px solid #f3f3f3;
    border-top: 10px solid #3498db;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
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
export const WeatherBlock = () => {
    const [city, setCity] = useState("");
    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Kazan&lat=33.44&lon=-94.04&lang=ru&appid=ccd7653bcd6a60de32734a5fee59e9eb`
        )
            .then((response) => {
                return response.json();
            })

            .then(({ name, main, weather }) => {
                setCity(name);
                setTemp(Math.round(main.temp));
                setDescription(weather[0].description);
            })
            .catch((error) => {
                setError(true);
            })
            .finally(setLoading(false));
    }, []);

    return (
        <Weather>
            {loading ? (
                <LoadingSpiner></LoadingSpiner>
            ) : (
                <div>
                    <h2>
                        Погода в городе: <br></br>
                        {error ? `Данные о погоде не доступны` : city}
                    </h2>
                </div>
            )}
            {loading ? (
                <LoadingSpiner></LoadingSpiner>
            ) : (
                <div>
                    <p>
                        Температура:{" "}
                        {error
                            ? `Данные о погоде не доступны`
                            : `${temp}°C; ${description}`}
                    </p>
                </div>
            )}
        </Weather>
    );
};
