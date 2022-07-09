import React from "react";
import {ListSearchingProducts} from "../../components/ProductsManagement/ListSearchingProducts/ListSearchingProducts";
import {ProductsSearcher} from "../../components/ProductsManagement/ProductsSearcher/ProductsSearcher";
import {AdminBtn} from "../../components/common/AdminBtn/AdminBtn";

export const AdminPanelView = () => (
    <>
        <ProductsSearcher/>
        <ListSearchingProducts/>
        <br/>
        <br/>
        <AdminBtn text="Dodaj nowy produkt" to="/admin/product/add"/>
    </>
)