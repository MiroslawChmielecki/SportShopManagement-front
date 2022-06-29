import React, {SyntheticEvent, useContext, useState} from "react";
import {ProductEntity} from "types";
import {SearchProductsContext} from "../../../context/search.context";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";
import {apiUrl} from "../../../config/api";
import {Spinner} from "../../common/Spinner/Spinner";

interface Props {
    product: ProductEntity,
    refreshSearchingList: () => void;
}

export const RemoveProduct = (props: Props) => {
    const {searchProducts, setSearchProducts} = useContext(SearchProductsContext);
    const [loading, setLoading] = useState(false);

    const deleteProduct = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.product.name}`)) {
            return;
        }

        setLoading(true);
         try {
             await fetch(`${apiUrl}/product/${props.product.id}`, {
                 method: 'DELETE',
             });

             setSearchProducts(searchProducts);

             props.refreshSearchingList();
         } finally {
             setLoading(false);
         }
    }

    if(loading) return <Spinner/>;

    return (
        <>
            <AdminBtn text="Usuń produkt" onClick={deleteProduct}/>
        </>

    )
}

