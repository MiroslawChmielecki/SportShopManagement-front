import React, {FormEvent, useState} from "react";
import {CreateProductEntity, ProductCategory} from 'types';
import {Spinner} from "../../common/Spinner/Spinner";
import {ProductEntity} from "types";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";


export const AddProduct = () => {

    const initialStateInForm = {
        name: '',
        imgPath: '.........',
        description: '..........',
        price: 5,
        category: ProductCategory.soccer,
        brand: '...........',
        dateAdded: '2022-06-22',
        quantity: 3,
    }

    const [form, setForm] = useState<CreateProductEntity>(initialStateInForm);

    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);

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
            const res = await fetch('http://localhost:3001/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });
            const data: ProductEntity = await res.json();
            console.log(data)
            //czyscimy pola w formularzu
            setForm(form => initialStateInForm);
            setResultInfo(`${data.name} added with ID ${data.id}`);
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
            </>
        )
    }

    return (
        <>
            <h2>Formularz dodawania</h2>
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
                    Photo: <br/>
                    <input
                        type="text"
                        value={form.imgPath}
                        onChange={e => updateForm('imgPath', e.target.value)}/>
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
                <button type="submit">Dodaj produkt</button>
            </form>
        </>
    )
}