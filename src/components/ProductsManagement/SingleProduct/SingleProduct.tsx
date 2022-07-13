import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {apiUrl} from "../../../config/api";
import {Navigate, useParams} from "react-router-dom";
import {ProductEntity} from "types";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";
import {Spinner} from "../../common/Spinner/Spinner";
import {ErrorShow} from "../../ErrorShow/ErrorShow";
import {SearchProductsContext} from "../../../context/search.context";
import {errorHandling} from "../../../utils/errorHandling";

export const SingleProduct = () => {
    const {id} = useParams()
    const {searchProducts, setSearchProducts} = useContext(SearchProductsContext);
    const [loading, setLoading] = useState(false);
    const [singleProduct, setSingleProduct] = useState<ProductEntity | null>(null);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    useEffect(() => {
        (async () => {
            try{
                setLoading(true);
                const res = await fetch(`${apiUrl}/admin/product/${id}`);
                errorHandling(res, setError);
                setError('')
                const data: ProductEntity = await res.json();
                setSingleProduct(data);
            } finally {
                setLoading(false)
            }
        })()
    }, [id]);


    const deleteProduct = async (e: SyntheticEvent) => {
        e.preventDefault();

        if(singleProduct === null) {
            return null
        }
        if (!window.confirm(`Czy na pewno chcesz usunąć ${singleProduct.name} ??`)) {
            return;
        }
        setLoading(true);

        try {
           const res = await fetch(`${apiUrl}/admin/product/${id}`, {
                method: 'DELETE',
            });

           errorHandling(res, setError);

           setError('');

            setSearchProducts(searchProducts);

        } finally {
            setLoading(false);
            setIsDeleted(true);
        }
    }


    if (loading) return <Spinner/>

    if(isDeleted) return <Navigate to="/admin/product"/>

    if(!singleProduct) return null;

    if (singleProduct.id !== id) {
        return (
            <>
                <ErrorShow text="Nieprawidłowy identyfikator produktu w adresie Url"/>
                <AdminBtn text="Lista produktów" to="/admin/product"/>
            </>
        )
    }

    return (
        <>
            <h2>Szczegóły produktu</h2>
            {error && <ErrorShow text={error}/>}
            <div>
                <p>{singleProduct.name}</p>
                <p>
                    <img src={singleProduct.image} width={70} height={50} alt={singleProduct.name}/>
                </p>
                <p>Cena: {singleProduct.price} zł</p>
                <p>Data dodania: {singleProduct.dateAdded}</p>
                <p>Marka: {singleProduct.brand}</p>
                <p>Ilość sztuk w magazynie: {singleProduct.quantity}</p>
                <p>Opis: {singleProduct.description}</p>
                <p>Kategoria produktu: {singleProduct.category}</p>
                <p>Rodzaj produktu: {singleProduct.productKind}</p>
            </div>
            <AdminBtn text="Usuń produkt" onClick={deleteProduct} to="/admin/product"/>
            <AdminBtn text="Edytuj" to={`/admin/product/edit/${id}`}/>
            <AdminBtn text="Dodaj kolejny produkt" to={'/admin/product/add'}/>
            <AdminBtn text="Lista produktów" to="/admin/product"/>
        </>
    )
}