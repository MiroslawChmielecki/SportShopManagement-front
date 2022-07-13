import React, {SyntheticEvent, useState} from "react";
import { AdminLoginEntity } from "types";
import {Spinner} from "../../../common/Spinner/Spinner";
import {AdminBtn} from "../../../common/AdminBtn/AdminBtn";
import {fetchApi} from "../../../../utils/fetchApi";
import {errorHandling} from "../../../../utils/errorHandling";
import {ErrorShow} from "../../../ErrorShow/ErrorShow";

export const AdminLogin = () => {
    const [adminName, setLoginAdmin] = useState<string>('')
    const [adminPassword, setPasswordAdmin] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loggedName, setLoggedName] = useState<string>('')

    const sendLoginForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        setLoggedName('');

        try {
            setLoading(true);

            const res = await fetchApi(
                'admin/login',
                'POST',
                {adminName, adminPassword} as AdminLoginEntity
            );

            errorHandling(res, setError);

            setError('');
            const data: string = await res.json();
            setLoggedName(data)

        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spinner/>;


    return (
        <>
            <h1>Login</h1>
            <form onSubmit={sendLoginForm}>
                <label> Podaj login:
                    <input type="text" onChange={(e) => {
                        setLoginAdmin(e.target.value)
                    }}/>
                </label>
                <br/>
                <label>Podaj hasło:
                    <input type="password" onChange={(e) => {
                        setPasswordAdmin(e.target.value)
                    }}/>
                </label>
                <button type="submit">Zaloguj</button>
            </form>
            {error && <ErrorShow text={error}/>}
            {
                loggedName && (
                    <>
                        <h2>Zostałeś poprawnie zalogowany jako {loggedName}</h2>
                        <AdminBtn text="Przejdź do panelu administratora" to="/admin/product"/>
                    </>
                )
            }
        </>
    )
}