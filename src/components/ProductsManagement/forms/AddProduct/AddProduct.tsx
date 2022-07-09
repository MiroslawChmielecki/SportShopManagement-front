import React, {FormEvent, useEffect, useState} from "react";
import {CreateProductEntity, ProductCategory} from 'types';
import {Spinner} from "../../../common/Spinner/Spinner";
import {ProductEntity} from "types";
import {AdminBtn} from "../../../common/AdminBtn/AdminBtn";
import {apiUrl} from "../../../../config/api";
import {productEntityInitial} from "../../../../utils/productEntityInitial";
import {ErrorShow} from "../../../ErrorShow/ErrorShow";

//selectImage
import {ProductImageObj} from 'types';
import './AddProduct.css';
import {selectKindProductsDependingOnCategory} from "../../../../utils/selectKindProductsDependingOnCategory";
import {selectImgDependOnKindProduct} from "../../../../utils/selectImgDependOnKindProduct";



export const AddProduct = () => {
    const [form, setForm] = useState<CreateProductEntity>(productEntityInitial);
    const [loading, setLoading] = useState<boolean>(false);
    const [productsKindField, setProductsKindField] = useState<string[] | []>([]);
    const [resultInfo, setResultInfo] = useState<string>('');
    const [productId, setProductId] = useState<string>('');
    const [errorInfo, setErrorInfo] = useState<string>('');

    //selectImage
    const [imagesToDisplay, setImagesToDisplay] = useState<ProductImageObj[] | null>(null);
    const [curObj, setCurObj] = useState<ProductImageObj | null>(null);

    const updateForm = (key: string, value: string | number) => {
        setForm(form => ({
                ...form,
                [key]: value,
            }
        ))
    }

    const updateFormProductAndKindCategory = (key: string, value: string | number) => {
        setForm(form => ({
                ...form,
                [key]: value,
            }
        ))
        form.productKind = '';
        form.image = '';
    }

    useEffect(() => {
        (async () => {

            // wybieramy rodzaj produktów w zależności od kategorii
            setImagesToDisplay(null);
            selectKindProductsDependingOnCategory(form.category, setProductsKindField);


            //wybieramy zdjęcia do wyświetlenia w zależności od rodzaju produktu
            if (form.productKind) {
                selectImgDependOnKindProduct(form.productKind, setImagesToDisplay)
            }
        })()
    }, [form.category, form.productKind]);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/admin/product`, {
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
            setErrorInfo('');

            const data: ProductEntity = await res.json();
            setProductId(data.id);

            setForm(form => productEntityInitial);
            setResultInfo(`produkt ${data.name} dodany do sklepu`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>
    }

    if (resultInfo) {
        return (
            <>
                <p>{resultInfo}</p>
                <AdminBtn text="Dodaj kolejny produkt" onClick={() => setResultInfo('')}/>
                <AdminBtn text="Lista szukanych produktów" to="/admin/product"/>
                <AdminBtn text="Pokaż produkt" to={`/admin/product/${productId}`}/>
            </>
        )
    }

    return (
        <>
            {errorInfo && <ErrorShow text={errorInfo}/>}
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
                        onChange={e => updateFormProductAndKindCategory('category', e.target.value)}
                    >
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
                    Rodzaj produktu <br/>
                    <select
                        required
                        value={form.productKind}
                        onChange={e => updateFormProductAndKindCategory('productKind', e.target.value)}
                    >
                        <option hidden value="" disabled>wybierz rodzaj produktu</option>
                        {
                            productsKindField.map(
                                productKind => (
                                    <option
                                        key={productKind}
                                        value={productKind}
                                    >{productKind}
                                    </option>
                                )
                            )
                        }
                        required
                    </select>
                </label>
                <br/>
                <label>
                    {imagesToDisplay ? <p>Wybierz zdjęcie do produktu z kategorii: {form.productKind}</p> : null}
                    <ul style={{margin: '20px auto'}}>
                        {
                            imagesToDisplay ? (
                                imagesToDisplay.map((oneImg) => (
                                    <li
                                        className={oneImg === curObj ? "active" : ""}
                                        key={oneImg.id}
                                    >
                                        <p>{oneImg.name}</p>
                                        <img src={oneImg.img} width={50} height={40}/>
                                        <AdminBtn
                                            text="Wybierz"
                                            onClick={() => {
                                                setCurObj(oneImg);
                                                updateForm('image', oneImg.img)
                                            }}/>
                                    </li>
                                ))
                            ) : null
                        }
                    </ul>
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