import React, {SyntheticEvent, useState} from 'react';
import { UserLoginEntity, UserRegisterEntity } from 'types';
import {Spinner} from "../../common/Spinner/Spinner";
import {ErrorShow} from "../../ErrorShow/ErrorShow";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";
import {fetchApi} from "../../../utils/fetchApi";
import {errorHandling} from "../../../utils/errorHandling";

export const ClientRegisterLogin = () => {
    //register
    const [userRegisterName, setUserRegisterName] = useState<string>('')
    const [userRegisterPassword, setUserRegisterPassword] = useState<string>('')
    const [errorRegister, setErrorRegister] = useState<string>('');
    const [registeredName, setRegisteredName] = useState<string>('')

    //login
    const [userLoginName, setUserLoginName] = useState<string>('')
    const [userLoginPassword, setUserLoginPassword] = useState<string>('')
    const [errorLogin, setErrorLogin] = useState<string>('');
    const [loggedName, setLoggedName] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false);

    const sendLoginForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        setLoggedName('');

        try {
            setLoading(true);
            const res = await fetchApi(
                'shop/login',
                'POST',
                {userLoginName, userLoginPassword} as UserLoginEntity
            )

            await errorHandling(res, setErrorLogin);

            setErrorLogin('');
            setUserLoginName('');
            setUserLoginPassword('');
            setRegisteredName('');
            const data: string = await res.json();
            setLoggedName(data)

        } finally {
            setLoading(false);
        }
    }

    if(loading) return <Spinner/>;

    const sendRegisterForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        setRegisteredName('');

        try {
            setLoading(true);

            const res = await fetchApi(
                'shop/register',
                'POST',
                {userRegisterName, userRegisterPassword} as UserRegisterEntity
                );

            await errorHandling(res, setErrorRegister);

            setErrorRegister('');
            setUserRegisterName('');
            setUserRegisterPassword('');

            const data: string = await res.json();
            setRegisteredName(data)

        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Spinner/>;

    return (
        <>
            <h1>Zaloguj się</h1>
            <form onSubmit={sendLoginForm}>
                <label> Podaj login:
                    <input type="text" onChange={(e) => {
                        setUserLoginName(e.target.value)
                    }}/>
                </label>
                <br/>
                <label>Podaj hasło:
                    <input type="password" onChange={(e) => {
                        setUserLoginPassword(e.target.value)
                    }}/>
                </label>
                <button type="submit">Zaloguj</button>
            </form>
            {errorLogin && <ErrorShow text={errorLogin}/>}
            {
                loggedName && (
                    <>
                        <h2>Zostałeś poprawnie zalogowany jako {loggedName}</h2>
                        <AdminBtn text="Przejdź do sklepu" to="/shop"/>
                    </>
                )
            }
            <br/>
            <br/>
            <br/>
            <h4>Zarejestruj się jeśli nie posiadasz jeszcze konta u nas i skorzystaj z wyjątkowych okazji tylko dla
                zarejestrowanych klientów</h4>
            <br/>

            <h1>Zarejestruj się</h1>
            <form onSubmit={sendRegisterForm}>
                <label> Podaj nazwę użytkownika:
                    <input type="text" onChange={(e) => {
                        setUserRegisterName(e.target.value)
                    }}/>
                </label>
                <br/>
                <label>Podaj hasło:
                    <input type="password" onChange={(e) => {
                        setUserRegisterPassword(e.target.value)
                    }}/>
                </label>
                <button type="submit">Zarejestruj</button>
            </form>
            {errorRegister && <ErrorShow text={errorRegister}/>}
            {
                registeredName && (
                    <>
                        <h3>Gratulacje !! zostałeś poprawnie zarejestrowany w naszym sklepie jako klient o
                            nazwie {registeredName}</h3>
                        <p>Zaloguj się w formularzu powyżej aby korzystać z wielu specjalnych okazji</p>
                    </>
                )
            }
            <br/>
            <br/>
            <br/>
            <AdminBtn text="Przejdź do sklepu bez rejestracji" to="/shop"/>
        </>
    )
}