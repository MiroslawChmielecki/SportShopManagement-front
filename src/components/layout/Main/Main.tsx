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

export const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/shop"/>}/>
            <Route path="/shop" element={<ShopView/>}/>
            <Route path="/store-policy" element={<StorePolicyView/>}/>
            <Route path="/contact" element={<ContactView/>}/>
            <Route path="/product" element={<AdminPanelView/>}/>
            <Route path="/product/:id" element={<SingleProduct/>}/>
            <Route path='/product/add' element={<AddProduct/>}/>
            <Route path='/product/edit/:id' element={<EditProduct/>}/>
            <Route path="*" element={<NotFoundView/>}/>
        </Routes>

    )
}