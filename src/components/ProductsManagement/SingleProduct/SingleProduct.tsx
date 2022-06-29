import React, {useEffect, useState} from "react";
import {apiUrl} from "../../../config/api";
import {useParams} from "react-router-dom";
import {ProductEntity} from "types";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";
import {Spinner} from "../../common/Spinner/Spinner";
import {ErrorShow} from "../../ErrorShow/ErrorShow";

export const SingleProduct = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(false);
    const [singleProduct, setSingleProduct] = useState<ProductEntity | null>(null);

    useEffect(() => {
        (async () => {
            try{
                setLoading(true);
                const res = await fetch(`${apiUrl}/product/${id}`);
                const data: ProductEntity = await res.json();
                setSingleProduct(data);

            } finally {
                setLoading(false)
            }
        })()
    }, [id]);

    if(loading) return <Spinner/>

    if(singleProduct === null) {
        return (
            <>
                <ErrorShow text="Błąd wczytywania produktu"/>
                <AdminBtn text="Lista produktów" to="/product"/>
            </>
        )
    }



    if(singleProduct.id !== id) {
        return (
            <>
                <ErrorShow text="Nieprawidłowy identyfikator produktu w adresie Url"/>
                <AdminBtn text="Lista produktów" to="/product"/>
            </>
        )
    }

    return (
        <>
            <h2>Szczegóły produktu</h2>
            <ul>
                <li>Nazwa: {singleProduct.name}</li>
                <li>Opis: {singleProduct.description}</li>
                <li>fotka: {singleProduct.imgPath}</li>
                <li>marka: {singleProduct.brand}</li>
                <li>ilość: {singleProduct.quantity}</li>
                <li>data dodania: {singleProduct.dateAdded}</li>
                <li>kategoria: {singleProduct.category}</li>
                <li>cena: {singleProduct.price}</li>
            </ul>
            <AdminBtn text="Usuń"/>
            <AdminBtn text="Edytuj" to={`/product/edit/${id}`}/>
            <AdminBtn text="Lista produktów" to="/product"/>
        </>
    )
}