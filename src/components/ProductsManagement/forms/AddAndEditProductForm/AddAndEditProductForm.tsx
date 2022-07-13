import React, {Dispatch, FormEventHandler, SetStateAction} from "react";
import {CreateProductEntity, ProductCategory, ProductImageObj} from "types";
import {AdminBtn} from "../../../common/AdminBtn/AdminBtn";
import {updateForm, updateFormProductAndKind} from "../../../../utils/updateFormAddEndEditProduct";

interface Props {
    sendForm: FormEventHandler,
    form: CreateProductEntity,
    setForm: Dispatch<SetStateAction<CreateProductEntity>>,
    imagesToDisplay: ProductImageObj[] | null,
    productsKindField: string[],
    curObj: ProductImageObj | null,
    setCurObj:Dispatch<SetStateAction<ProductImageObj | null>>
    textBtn: string,
}

export const AddAndEditProductForm = (props: Props) => {
    const {sendForm, form, setForm, imagesToDisplay, productsKindField, curObj, setCurObj, textBtn} = props;
    return (
        <>
            <form onSubmit={sendForm}>
                <label>
                    Name: <br/>
                    <input
                        type="text"
                        value={form.name}
                        onChange={e => updateForm(form, setForm, 'name', e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Opis: <br/>
                    <textarea
                        value={form.description}
                        onChange={e => updateForm(form, setForm, 'description', e.target.value)}
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
                        onChange={e => updateForm(form, setForm, 'price', Number(e.target.value))}
                        required
                    />
                </label>
                <br/>
                <label>
                    Dziedzina sportu: <br/>
                    <select
                        value={form.category}
                        onChange={e => updateFormProductAndKind(form, setForm, 'category', e.target.value)}
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
                        onChange={e => updateFormProductAndKind(form, setForm, 'productKind', e.target.value)}
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
                    Zdjęcie:
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
                                        <img src={oneImg.img} width={50} height={40} alt={oneImg.name}/>
                                        <AdminBtn
                                            text="Wybierz"
                                            onClick={() => {
                                                setCurObj(oneImg);
                                                updateForm(form, setForm, 'image', oneImg.img)
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
                        onChange={e => updateForm(form, setForm, 'brand', e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Data dodania: <br/>
                    <input
                        type="date"
                        value={form.dateAdded}
                        onChange={e => updateForm(form, setForm, 'dateAdded', e.target.value)}
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
                        onChange={e => updateForm(form, setForm, 'quantity', Number(e.target.value))}
                        required
                    />
                </label>
                <br/>
                <AdminBtn text={textBtn}/>
            </form>
        </>
    )
}