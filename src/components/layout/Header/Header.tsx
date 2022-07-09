import React from "react";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";

export const Header = () => (
    <>
        <h2>Header</h2>
        <AdminBtn text="Panel administratora" to="/admin/login"/>
        <AdminBtn text="Sklep" to="/shop"/>
        <AdminBtn text="Regulamin sklepu" to="/store-policy"/>
        <AdminBtn text="Kontakt" to="/contact"/>
        <AdminBtn text="Zaloguj się" to="/shop/registerLogin"/>
    </>
)