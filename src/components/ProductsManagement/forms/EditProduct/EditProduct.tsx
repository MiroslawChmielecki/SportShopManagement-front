import React, {FormEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CreateProductEntity, ProductEntity, ProductImageObj} from "types";
import {apiUrl} from "../../../../config/api";
import {productEntityInitial, productEntityInitialWithId} from "../../../../utils/productEntityInitial";
import {fetchApi} from "../../../../utils/fetchApi";
import {errorHandling} from "../../../../utils/errorHandling";
import {selectKindProductsDependingOnCategory} from "../../../../utils/selectKindProductsDependingOnCategory";
import {selectImgObjDependOnKindProduct} from "../../../../utils/selectImgObjDependOnKindProduct";
import {AdminBtn} from "../../../common/AdminBtn/AdminBtn";
import {Spinner} from "../../../common/Spinner/Spinner";
import {ErrorShow} from "../../../ErrorShow/ErrorShow";
import {AddAndEditProductForm} from "../AddAndEditProductForm/AddAndEditProductForm";

export const EditProduct = () => {
    const [form, setForm] = useState<CreateProductEntity>(productEntityInitial);
    const [loading, setLoading] = useState(false);
    const [productsKindField, setProductsKindField] = useState<string[] | []>([]);
    const [errorInfo, setErrorInfo] = useState<string>('');
    const [imagesToDisplay, setImagesToDisplay] = useState<ProductImageObj[] | null>(null);
    const [curObj, setCurObj] = useState<ProductImageObj | null>(null);
    const [productEdited, setProductEdited] = useState<ProductEntity>(productEntityInitialWithId)
    const [productNameBeforeUpdate, setProductNameBeforeUpdate] = useState<string>('');
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            setImagesToDisplay(null);
            selectKindProductsDependingOnCategory(form.category, setProductsKindField);

            if (form.productKind) {
                selectImgObjDependOnKindProduct(form.productKind, setImagesToDisplay)
            }
        })()
    }, [form.category, form.productKind]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch(`${apiUrl}/admin/product/${id}`);
                await errorHandling(res, setErrorInfo);
                const data: CreateProductEntity = await res.json();
                setForm(data);
                setProductNameBeforeUpdate(data.name)

            } finally {
                setLoading(false);
            }
        })()
    }, [id]);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            setLoading(true);
            const res = await fetchApi(`admin/product/${id}`, 'PUT', form as CreateProductEntity);
            await errorHandling(res, setErrorInfo);
            setErrorInfo('');
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

    return (
        <>
            {errorInfo && <ErrorShow text={errorInfo}/>}
            <h2>Formularz edycji produktu</h2>
            {
                !productNameBeforeUpdate
                    ? (
                        <>
                            <ErrorShow text="Nieprawidłowy identyfikator produktu w adresie Url"/>
                            <AdminBtn text="Lista produktów" to="/admin/product"/>
                        </>
                    )
                    : <AddAndEditProductForm
                        sendForm={sendForm}
                        form={form}
                        setForm={setForm}
                        imagesToDisplay={imagesToDisplay}
                        productsKindField={productsKindField}
                        curObj={curObj}
                        setCurObj={setCurObj}
                        textBtn="Edytuj produkt"
                    />
            }
        </>
    )
}