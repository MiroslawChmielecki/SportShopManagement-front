import React from "react";
import {Route, Routes} from "react-router-dom";
import {ShopView} from "../../../views/ShopView/ShopView";
import {AdminPanelView} from "../../../views/AdminPanelView/AdminPanelView";
import {NotFoundView} from "../../../views/NotFoundView/NotFoundView";
import {AddProduct} from "../../ProductsManagement/AddProduct/AddProduct";
import {EditProduct} from "../../ProductsManagement/EditProduct/EditProduct";

export const Main = () => {
    return (
        <Routes>
            <Route path="/shop" element={<ShopView/>}/>
            <Route path="/product" element={<AdminPanelView/>}/>
            <Route path='/product/add' element={<AddProduct/>}/>
            <Route path='/product/edit/:id' element={<EditProduct/>}/>
            <Route path="*" element={<NotFoundView/>}/>
        </Routes>

    )
}