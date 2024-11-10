import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff/server";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../bff/actions/index";
import { useDispatch, useStore } from "react-redux";
import {
    AuthorizationBackground,
    StyledAuthorization,
} from "../../components/styeld-modal-overlay";
const authFormSchema = yup.object().shape({
    login: yup
        .string()
        .required(`*Логин обязателен для заполнения`)
        .matches(/^[a-zA-Z0-9]+$/, "*Только латинские буквы и цифры")
        .min(3, "*Логин должен содержать минимум 3 символа")
        .max(10, "*Логин должен содержать максимум 10 символов"),
    password: yup
        .string()
        .required(`*Пароль обязателен для заполнения`)
        .matches(/^[a-zA-Z0-9#$%]+$/, "*Пароль содержит запрещенные символы")
        .min(6, "*Пароль должен содержать минимум 6 символов")
        .max(20, "*Пароль должен содержать максимум 20 символов"),
});

export const Authorization = () => {
    const dispatch = useDispatch();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        resolver: yupResolver(authFormSchema),
    });
    const [serverError, setServerError] = useState(null);

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`${error}`);
                return;
            }
            dispatch(setUser(res));
            sessionStorage.setItem("userData", JSON.stringify(res));
            navigate("/");
        });
    };
    const formError =
        serverError || errors?.login?.message || errors?.password?.message;
    const navigate = useNavigate();
    const store = useStore();
    useEffect(() => {
        let currentWasLogout = store.getState().app.wasLogout;
        return () =>
            store.subscribe(() => {
                let prevWasLogout = currentWasLogout;
                prevWasLogout = store.getState().app.wasLogout;
                if (prevWasLogout !== currentWasLogout) {
                    reset();
                }
            });
    }, []);

    return (
        <AuthorizationBackground>
            <StyledAuthorization>
                <i className="fa fa-times" onClick={() => navigate(-1)}></i>
                <h2>Авторизация</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Логин"
                        {...register("login", {
                            onChange: () => setServerError(null),
                        })}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        {...register("password", {
                            onChange: () => setServerError(null),
                        })}
                    />
                    {formError && <span>{formError}</span>}
                    <p>
                        Нет аккаунта?
                        <br />
                        <Link to="/register">Создать аккаунт</Link>
                    </p>
                    <button type="submit" disabled={!!formError}>
                        Войти
                    </button>
                </form>
            </StyledAuthorization>
        </AuthorizationBackground>
    );
};
