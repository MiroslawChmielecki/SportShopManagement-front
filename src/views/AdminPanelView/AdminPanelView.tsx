import React from "react";
import {ProductsList} from "../../components/ProductsManagement/ProductsList/ProductsList";
import {ProductsSearcher} from "../../components/ProductsManagement/ProductsSearcher/ProductsSearcher";
import {AdminBtn} from "../../components/common/AdminBtn/AdminBtn";

export const AdminPanelView = () => (
    <>
        <ProductsSearcher/>
        <AdminBtn text="Dodaj nowy produkt" to="/admin/product/add"/>
        <ProductsList/>
        <br/>
        <br/>
    </>
)