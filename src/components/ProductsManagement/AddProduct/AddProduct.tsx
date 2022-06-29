import React, {FormEvent, useState} from "react";
import {CreateProductEntity, ProductCategory} from 'types';
import {Spinner} from "../../common/Spinner/Spinner";
import {ProductEntity} from "types";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";
import {apiUrl} from "../../../config/api";
import {productEntityInitial} from "../../../utils/productEntityInitial";
import {ErrorShow} from "../../ErrorShow/ErrorShow";

export const AddProduct = () => {

    const [form, setForm] = useState<CreateProductEntity>(productEntityInitial);
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const [productId, setProductId] = useState<string>('');
    const [errorInfo, setErrorInfo] = useState<string | null>(null);

    const updateForm = (key: string, value: string | number) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form as CreateProductEntity)
            });

            if ([400 || 500 || 404].includes(res.status)) {
                const err = await res.json()
                setErrorInfo(err.message);
                return
            }

            setErrorInfo(null);

            const data: ProductEntity = await res.json();
            setProductId(data.id);

            //czyscimy pola w formularzu
            setForm(form => productEntityInitial);
            setResultInfo(`produkt ${data.name} dodany do sklepu`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>
    }

    if (resultInfo !== null) {
        return (
            <>
                <p>{resultInfo}</p>
                <AdminBtn text="Dodaj kolejny produkt" onClick={() => setResultInfo(null)}/>
                <AdminBtn text="Lista szukanych produktów" to="/product"/>
                <AdminBtn text="Pokaż produkt" to={`/product/${productId}`}/>
            </>
        )
    }

    return (
        <>
            {errorInfo !== null && <ErrorShow errorInfo={errorInfo}/> }
            <h2>Formularz dodawania</h2>
            <form onSubmit={sendForm}>
                <label>
                    Name: <br/>
                    <input
                        type="text"
                        value={form.name}
                        onChange={e => updateForm('name', e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Photo: <br/>
                    <input
                        type="text"
                        value={form.imgPath}
                        onChange={e => updateForm('imgPath', e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Opis: <br/>
                    <input
                        type="text"
                        value={form.description}
                        onChange={e => updateForm('description', e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Cena: <br/>
                    <input
                        type="number"
                        value={form.price}
                        min='0'
                        step="0.01"
                        onChange={e => updateForm('price', Number(e.target.value))}
                        required
                    />
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
                        required
                    </select>
                </label>
                <br/>
                <label>
                    Marka: <br/>
                    <input
                        type="text"
                        value={form.brand}
                        onChange={e => updateForm('brand', e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Data dodania: <br/>
                    <input
                        type="date"
                        value={form.dateAdded}
                        onChange={e => updateForm('dateAdded', e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Ilość: <br/>
                    <input
                        type="number"
                        value={form.quantity}
                        min='0'
                        onChange={e => updateForm('quantity', Number(e.target.value))}
                        required
                    />
                </label>
                <br/>
                <AdminBtn text="Dodaj produkt"/>
            </form>
        </>
    )
}