import React, {FormEvent, useContext, useEffect, useState} from "react";
import {
    BadmintonProductKind,
    BaseballProductKind,
    BasketballProductKind,
    CreateProductEntity,
    HockeyProductKind,
    ProductCategory,
    RugbyProductKind,
    SoccerProductKind,
    TennisProductKind
} from 'types';
import {Spinner} from "../../../common/Spinner/Spinner";
import {ProductEntity} from "types";
import {AdminBtn} from "../../../common/AdminBtn/AdminBtn";
import {apiUrl} from "../../../../config/api";
import {productEntityInitial} from "../../../../utils/productEntityInitial";
import {ErrorShow} from "../../../ErrorShow/ErrorShow";
import {SelectImage} from "../../SelectImage/SelectImage";
import {ProductFormImageContext} from "../../../../context/productFormImage.context";


export const AddProduct = () => {

    const [form, setForm] = useState<CreateProductEntity>(productEntityInitial);
    const [loading, setLoading] = useState<boolean>(false);
    const [productsKindField, setProductsKindField] = useState<string[] | null>(null);
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const [productId, setProductId] = useState<string>('');
    const [errorInfo, setErrorInfo] = useState<string | null>(null);
    const {productFormImage} = useContext(ProductFormImageContext)



    const updateForm = (key: string, value: string | number) => {
        setForm(form => ({
                ...form,
                [key]: value,
            }
        ))
    }

   const updateProductCategory = (key: string, value: string | number) => {
        setForm(form => ({
                ...form,
                [key]: value,
            }
            ))
       form.productKind = '';
    }

    useEffect(() => {
        (async () => {

            switch (form.category) {
                case ProductCategory.badminton:
                    setProductsKindField((Object.keys(BadmintonProductKind) as (keyof typeof BadmintonProductKind)[]).map(
                        product => BadmintonProductKind[product]
                    ))
                    break;

                case ProductCategory.baseball:
                    setProductsKindField((Object.keys(BaseballProductKind) as (keyof typeof BaseballProductKind)[]).map(
                        product => BaseballProductKind[product]
                    ))
                    break;

                case ProductCategory.basketball:
                    setProductsKindField((Object.keys(BasketballProductKind) as (keyof typeof BasketballProductKind)[]).map(
                        product => BasketballProductKind[product]
                    ))
                    break;

                case ProductCategory.hockey:
                    setProductsKindField((Object.keys(HockeyProductKind) as (keyof typeof HockeyProductKind)[]).map(
                        product => HockeyProductKind[product]
                    ))
                    break;

                case ProductCategory.rugby:
                    setProductsKindField((Object.keys(RugbyProductKind) as (keyof typeof RugbyProductKind)[]).map(
                        product => RugbyProductKind[product]
                    ))
                    break;

                case ProductCategory.soccer:
                    setProductsKindField((Object.keys(SoccerProductKind) as (keyof typeof SoccerProductKind)[]).map(
                        product => SoccerProductKind[product]
                    ))
                    break;

                case ProductCategory.tennis:
                    setProductsKindField((Object.keys(TennisProductKind) as (keyof typeof TennisProductKind)[]).map(
                        product => TennisProductKind[product]
                    ))
                    break;
            }

        })()
    }, [form.category, form.productKind]);

    useEffect(() => {
        (async () => {
           updateForm('image', productFormImage)
        })()
    },[productFormImage])

   const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form as CreateProductEntity)
            });

            console.log(res.status)


            if ([400 || 500 || 404].includes(res.status)) {
                console.log(res.status)
                const err = await res.json()
                alert(`błąd ${err.message}`)
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

    if (productsKindField === null) {
        return null;
    }

    return (
        <>
            {errorInfo !== null && <ErrorShow errorInfo={errorInfo}/>}
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
                        onChange={e => updateProductCategory('category', e.target.value)}
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
                        value={form.productKind}
                        onChange={e => updateForm('productKind', e.target.value)}
                    >
                        <option value="" disabled>wybierz rodzaj produktu</option>
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
                    <SelectImage
                        productKind={form.productKind}
                    />
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