import React, {useContext, useEffect, useState} from "react";
import {SearchProductsContext} from "../../../context/search.context";
import {ProductEntity} from "types";
import {RemoveProduct} from "../RemoveProduct/RemoveProduct";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";

export const ListSearchingProducts = () => {
    const {searchProducts} = useContext(SearchProductsContext);
    const [products, setProducts] = useState<ProductEntity[]>([]);


    const refreshSearchingProductsList = async () => {
        const res = await fetch(`http://localhost:3001/product/search/${searchProducts}`);
        const data = await res.json();
        setProducts(data);
    }
    useEffect( () => {
       refreshSearchingProductsList()
    }, [searchProducts]);

    return (
        <>
            <h2>Lista szukanych produktów</h2>
            <ul>
                {
                    products.map(product => (
                        <li key={product.id}>
                            <p>{product.name}</p>
                            <RemoveProduct
                                product={product}
                                refreshList={refreshSearchingProductsList}
                            />
                            <AdminBtn
                                text="Edytuj produkt"
                                to={`/product/edit/${product.id}`}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}