import React, {useContext, useEffect, useState} from "react";
import {ProductEntity} from "types";
import {SearchProductsContext} from "../../../context/search.context";
import {apiUrl} from "../../../config/api";
import {errorHandling} from "../../../utils/errorHandling";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";
import {Spinner} from "../../common/Spinner/Spinner";
import {ErrorShow} from "../../ErrorShow/ErrorShow";

export const ProductsList = () => {
    const {searchProducts} = useContext(SearchProductsContext);
    const [products, setProducts] = useState<ProductEntity[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(`${apiUrl}/admin/product/search/${searchProducts}`);
                await errorHandling(res, setError)

                setError('')
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
            <h2>Lista produktów</h2>
            {error && <ErrorShow text={error}/>}
            {
                products.map(product => (
                    <ul key={product.id} className="singleProduct">
                        <li>{product.name}</li>
                        <li>{product.productKind}</li>
                        <li>
                            <img src={product.image} width={70} height={50} alt={product.name}/>
                        </li>
                        <li>{product.category}</li>
                        <li>{product.price} zł</li>
                        <li>{product.dateAdded}</li>
                        <li>{product.brand}</li>
                        <li>Ilość w magazynie: {product.quantity}</li>
                        <li>{product.description}</li>
                        <AdminBtn
                            text="Zarządzaj produktem"
                            to={`/admin/product/${product.id}`}
                        />
                    </ul>
                ))
            }
        </>
    )
}