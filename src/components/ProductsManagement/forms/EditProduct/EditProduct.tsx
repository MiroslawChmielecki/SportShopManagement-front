import React, {FormEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CreateProductEntity, ProductCategory, ProductEntity} from "types";
import {AdminBtn} from "../../../common/AdminBtn/AdminBtn";
import {Spinner} from "../../../common/Spinner/Spinner";
import {apiUrl} from "../../../../config/api";
import {productEntityInitial, productEntityInitialWithId} from "../../../../utils/productEntityInitial";
import {ErrorShow} from "../../../ErrorShow/ErrorShow";

export const EditProduct = () => {
    const [form, setForm] = useState<CreateProductEntity>(productEntityInitial);
    const [loading, setLoading] = useState(false);
    const [productEdited, setProductEdited] = useState<ProductEntity>(productEntityInitialWithId)
    const [productNameBeforeUpdate, setProductNameBeforeUpdate] = useState<string>('');
    const [errorInfo, setErrorInfo] = useState<string | null>(null);
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch(`${apiUrl}/admin/product/${id}`);
                const data: CreateProductEntity = await res.json();
                setForm(data);
                setProductNameBeforeUpdate(data.name)

            } finally {
                setLoading(false);
            }
        })()
    }, [id]);

    const updateForm = (key: string, value: string | number) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    };


    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/admin/product/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form as CreateProductEntity),
            });

            console.log(res.status)

            if ([400 || 500 || 404].includes(res.status)) {
                const err = await res.json()
                setErrorInfo(err.message);
                return
            }

            setErrorInfo(null);

            const data: ProductEntity = await res.json();

            setProductEdited(data)


        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <Spinner/>
    }

    if (productEdited.id === id) {
        return (
            <>
                <p>Produkt {productEdited.name} został zaktualizowany</p>
                <AdminBtn text="Pokaż aktualny produkt" to={`/admin/product/${productEdited.id}`}/>
                <AdminBtn text="Lista produktów" to="/admin/product"/>
            </>
        )
    }

    console.log({productNameBeforeUpdate});

    return (
        <>
            {errorInfo !== null && <ErrorShow errorInfo={errorInfo}/>}
            {
                !productNameBeforeUpdate
                    ? (
                        <>
                            <ErrorShow text="Nieprawidłowy identyfikator produktu w adresie Url"/>
                            <AdminBtn text="Lista produktów" to="/admin/product"/>
                        </>
                    )
                    : (
                        <>

                            <p>Formularz edycji produktu {productNameBeforeUpdate}</p>
                            <form onSubmit={sendForm}>
                                <label>
                                    Name: <br/>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => updateForm('name', e.target.value)}/>
                                </label>
                                <br/>
                                <label>
                                    Opis: <br/>
                                    <input
                                        type="text"
                                        value={form.description}
                                        onChange={e => updateForm('description', e.target.value)}/>
                                </label>
                                <br/>
                                <label>
                                    Cena: <br/>
                                    <input
                                        type="number"
                                        value={form.price}
                                        min='0'
                                        onChange={e => updateForm('price', Number(e.target.value))}/>
                                </label>
                                <br/>
                                <label>
                                    Dziedzina sportu: <br/>
                                    <select
                                        value={form.category}
                                        onChange={e => updateForm('category', e.target.value)}>
                                        {
                                            (Object.keys(ProductCategory) as (keyof typeof ProductCategory)[]).map(
                                                key => (
                                                    <option
                                                        key={key}
                                                        value={ProductCategory[key]}
                                                    >{ProductCategory[key]}
                                                    </option>
                                                ))
                                        }
                                    </select>
                                </label>
                                <br/>
                                <label>
                                    Rodzaj produktu <br/>
                                    <select
                                        value={form.productKind}
                                        onChange={e => updateForm('productKind', e.target.value)}>
                                        {
                                            // (Object.keys(ProductCategory) as (keyof typeof ProductCategory)[]).map(
                                            //     key => (
                                            //         <option
                                            //             key={key}
                                            //             value={ProductCategory[key]}
                                            //         >{ProductCategory[key]}
                                            //         </option>
                                            //     ))
                                        }
                                        required
                                    </select>
                                </label>
                                <br/>
                                <label>
                                    Dobierz zdjęcie do produktu: <br/>
                                    {/*<select*/}
                                    {/*    value={form.image}*/}
                                    {/*    onChange={e => updateForm('image', e.target.value)}*/}
                                    {/*>*/}
                                    {/*    {*/}
                                    {/*        (Object.keys(Soccer) as (keyof typeof Soccer)[]).map(*/}
                                    {/*            key => (*/}
                                    {/*                <option*/}
                                    {/*                    key={key}*/}
                                    {/*                    value={Soccer[key]}*/}
                                    {/*                >{Soccer[key]}*/}
                                    {/*                </option>*/}
                                    {/*            ))*/}
                                    {/*    }*/}
                                    {/*    required*/}
                                    {/*</select>*/}
                                </label>
                                <br/>
                                <label>
                                    Marka: <br/>
                                    <input
                                        type="text"
                                        value={form.brand}
                                        onChange={e => updateForm('brand', e.target.value)}/>
                                </label>
                                <br/>
                                <label>
                                    Data dodania: <br/>
                                    <input
                                        type="date"
                                        value={form.dateAdded}
                                        onChange={e => updateForm('dateAdded', e.target.value)}/>
                                </label>
                                <br/>
                                <label>
                                    Ilość: <br/>
                                    <input
                                        type="number"
                                        value={form.quantity}
                                        min='0'
                                        onChange={e => updateForm('quantity', Number(e.target.value))}/>
                                </label>
                                <br/>
                                <AdminBtn text="Edytuj produkt"/>
                            </form>
                        </>
                    )
            }

        </>
    )
}