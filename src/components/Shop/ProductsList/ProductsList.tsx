import React, {useEffect, useState} from "react";
import {ProductEntity} from "types";
import {apiUrl} from "../../../config/api";
import {errorHandling} from "../../../utils/errorHandling";
import {Spinner} from "../../common/Spinner/Spinner";
import {ErrorShow} from "../../ErrorShow/ErrorShow";
import './ProductsList.css';


export const ProductsList = () => {
    const [productsDisplay, setProductsDisplay] = useState<ProductEntity[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(`${apiUrl}/shop/product`);
                await errorHandling(res, setError)

                setError('')
                const data = await res.json();
                setProductsDisplay(data);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <Spinner/>;

    return (
        <>
            <h2>Lista produktów</h2>
            {error && <ErrorShow text={error}/>}
            {
                productsDisplay.map(product => (
                    <div key={product.id} className='singleProduct'>
                        <p><strong>{product.name}</strong></p>
                        <p>
                            <img src={product.image} width={70} height={50} alt={product.name}/>
                        </p>
                        <p>Cena: <strong>{product.price}</strong> zł</p>
                        <p>Data dodania: <strong>{product.dateAdded}</strong></p>
                        <p>Marka: <strong>{product.brand}</strong></p>
                        <p>Ilość sztuk w magazynie: <strong>{product.quantity}</strong></p>
                        <p>Opis: <strong>{product.description}</strong></p>
                        <p>Kategoria produktu: <strong>{product.category}</strong></p>
                        <p>Rodzaj produktu: <strong>{product.productKind}</strong></p>
                    </div>
                ))
            }
        </>
    )
}