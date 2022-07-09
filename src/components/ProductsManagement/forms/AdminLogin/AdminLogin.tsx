import React, {SyntheticEvent, useState} from "react";
import {apiUrl} from "../../../../config/api";
import {Spinner} from "../../../common/Spinner/Spinner";
import {ErrorShow} from "../../../ErrorShow/ErrorShow";
import {AdminBtn} from "../../../common/AdminBtn/AdminBtn";

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
            const res = await fetch(`${apiUrl}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    adminName,
                    adminPassword,
                })
            });

            if ([400 || 500 || 404].includes(res.status)) {
                const err = await res.json();
                setError(err.message);
                return
            }
            setError('');

            const data: string = await res.json();
            setLoggedName(data)

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>
    }

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
                        <p>Zostałeś poprawnie zalogowany jako {loggedName}</p>
                        <AdminBtn text="Przejdź do panelu administratora" to="/admin/product"/>
                    </>
                )
            }
        </>
    )
}