import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {apiUrl} from "../../../config/api";
import {Navigate, useParams} from "react-router-dom";
import {ProductEntity} from "types";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";
import {Spinner} from "../../common/Spinner/Spinner";
import {ErrorShow} from "../../ErrorShow/ErrorShow";
import {SearchProductsContext} from "../../../context/search.context";
import SoccerSocks1 from '../../../images/soccerSocks/soccerSocks1.png';

export const SingleProduct = () => {
    const {searchProducts, setSearchProducts} = useContext(SearchProductsContext);
    const {id} = useParams()
    const [loading, setLoading] = useState(false);
    const [singleProduct, setSingleProduct] = useState<ProductEntity | null>(null);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);


    useEffect(() => {
        (async () => {
            try{
                setLoading(true);
                const res = await fetch(`${apiUrl}/product/${id}`);
                const data: ProductEntity = await res.json();
                setSingleProduct(data);
            }
            finally {
                setLoading(false)
            }
        })()
    }, [id]);


    const deleteProduct = async (e: SyntheticEvent) => {
        e.preventDefault();
        if(singleProduct === null) {
            return null
        }
        if (!window.confirm(`Are you sure you want to remove ${singleProduct.name}`)) {
            return;
        }
        setLoading(true);
        try {
            await fetch(`${apiUrl}/product/${id}`, {
                method: 'DELETE',
            });
            setSearchProducts(searchProducts);

        } finally {
            setLoading(false);
            setIsDeleted(true);
        }
    }


    if (loading) return <Spinner/>

    if(isDeleted) return <Navigate to="/product"/>



    if (singleProduct === null) {
        return (
            <>
                <ErrorShow text="Błąd wczytywania produktu"/>
                <AdminBtn text="Lista produktów" to="/product"/>
            </>
        )
    }


    if (singleProduct.id !== id) {
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
                <li>
                    fotka: {singleProduct.image}
                    <img src={SoccerSocks1} height={50} width={70} alt="skarpety"/>
                </li>
                <li>marka: {singleProduct.brand}</li>
                <li>ilość: {singleProduct.quantity}</li>
                <li>data dodania: {singleProduct.dateAdded}</li>
                <li>kategoria: {singleProduct.category}</li>
                <li>rodzaj produktu: {singleProduct.productKind}</li>
                <li>cena: {singleProduct.price}</li>
            </ul>
            <AdminBtn text="Usuń produkt" onClick={deleteProduct} to="/product"/>
            <AdminBtn text="Edytuj" to={`/product/edit/${id}`}/>
            <AdminBtn text="Lista produktów" to="/product"/>
        </>
    )
}