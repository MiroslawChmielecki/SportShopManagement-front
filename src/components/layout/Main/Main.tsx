import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {ShopView} from "../../../views/ShopView/ShopView";
import {AdminPanelView} from "../../../views/AdminPanelView/AdminPanelView";
import {NotFoundView} from "../../../views/NotFoundView/NotFoundView";
import {AddProduct} from "../../ProductsManagement/forms/AddProduct/AddProduct";
import {EditProduct} from "../../ProductsManagement/forms/EditProduct/EditProduct";
import {SingleProduct} from "../../ProductsManagement/SingleProduct/SingleProduct";
import {StorePolicyView} from "../../../views/StorePolicyView/StorePolicyView";
import {ContactView} from "../../../views/ContactView/ContactView";
import {AdminLogin} from "../../ProductsManagement/forms/AdminLogin/AdminLogin";
import {ClientRegisterLogin} from "../../Shop/forms/ClientRegisterLogin";

export const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/shop"/>}/>
            <Route path="/shop" element={<ShopView/>}/>
            <Route path="/shop/registerLogin" element={<ClientRegisterLogin/>}/>
            <Route path="/admin/product" element={<AdminPanelView/>}/>
            <Route path="/admin/product/:id" element={<SingleProduct/>}/>
            <Route path='/admin/product/add' element={<AddProduct/>}/>
            <Route path='/admin/product/edit/:id' element={<EditProduct/>}/>
            <Route path="/admin/login" element={<AdminLogin/>}/>
            <Route path="/store-policy" element={<StorePolicyView/>}/>
            <Route path="/contact" element={<ContactView/>}/>
            <Route path="*" element={<NotFoundView/>}/>
        </Routes>
    )
}