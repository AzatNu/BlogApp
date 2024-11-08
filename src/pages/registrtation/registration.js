import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff/server";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../bff/actions/index";
import { useDispatch, useStore } from "react-redux";
import {
    AuthorizationBackground,
    StyledAuthorization,
} from "../../components/styeld-modal-overlay";

const regFormSchema = yup.object().shape({
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
    passwordRepeat: yup
        .string()
        .oneOf([yup.ref("password"), null], "*Пароли должны совпадать"),
});

export const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
            passwordRepeat: "",
        },
        resolver: yupResolver(regFormSchema),
    });
    const [serverError, setServerError] = useState(null);
    const onSubmit = ({ login, password }) => {
        server.registred(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`${error}`);
                return;
            }
            dispatch(setUser(res));
            navigate("/");
        });
    };

    const formError =
        errors?.login?.message ||
        errors?.password?.message ||
        errors?.passwordRepeat?.message ||
        serverError;
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
                <i className="fa fa-times" onClick={() => navigate(-2)}></i>
                <h2>Регистрация</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Придумайте логин"
                        {...register("login", {
                            onChange: () => setServerError(null),
                        })}
                    />
                    <input
                        type="password"
                        placeholder="Придумайте пароль"
                        {...register("password", {
                            onChange: () => setServerError(null),
                        })}
                    />
                    <input
                        type="password"
                        placeholder="Повторите пароль"
                        {...register("passwordRepeat", {
                            onChange: () => setServerError(null),
                        })}
                    />
                    {formError && <span>{formError}</span>}
                    <button type="submit" disabled={!!formError}>
                        Зарегистрироваться
                    </button>
                </form>
            </StyledAuthorization>
        </AuthorizationBackground>
    );
};
