import React, {useContext, useEffect, useState} from "react";
import {SearchProductsContext} from "../../../context/search.context";
import {ProductEntity} from "types";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";
import {apiUrl} from "../../../config/api";
import {Spinner} from "../../common/Spinner/Spinner";

export const ListSearchingProducts = () => {
    const {searchProducts} = useContext(SearchProductsContext);
    const [products, setProducts] = useState<ProductEntity[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(`${apiUrl}/admin/product/search/${searchProducts}`);
                const data = await res.json();
                setProducts(data);
            } finally {
                setLoading(false);
            }
        })();
    }, [searchProducts]);

    if (loading) return <Spinner/>;

    return (
        <>
            <h2>Lista szukanych produktów</h2>
            <ul>
                {
                    products.map(product => (
                        <li key={product.id}>
                            <p>{product.name}</p>
                            <p>
                                <img src={product.image} width={70} height={50} alt={product.name}/>
                            </p>
                            <AdminBtn
                                text="Zarządzaj produktem"
                                to={`/admin/product/${product.id}`}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}