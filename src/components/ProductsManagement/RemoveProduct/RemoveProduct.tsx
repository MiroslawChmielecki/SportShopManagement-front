import React, {SyntheticEvent, useContext} from "react";
import {ProductEntity} from "types";
import {SearchProductsContext} from "../../../context/search.context";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";

interface Props {
    product: ProductEntity,
    refreshList: () => void;
}

export const RemoveProduct = (props: Props) => {
    const {searchProducts, setSearchProducts} = useContext(SearchProductsContext);

    const deleteProduct = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.product.name}`)) {
            return;
        }

       await fetch(`http://localhost:3001/product/${props.product.id}`, {
            method: 'DELETE',
        });

        setSearchProducts(searchProducts);

        props.refreshList();
    }

    return (
        <AdminBtn text="Usuń produkt" onClick={deleteProduct}/>
    )
}

//wpisujemy wszystkie kody ktore obslugujwmy
// if([400 || 500].includes(res.status)) {
//     const err = await res.json()
//     alert(`błąd ${err.message}`)
//     return
// }