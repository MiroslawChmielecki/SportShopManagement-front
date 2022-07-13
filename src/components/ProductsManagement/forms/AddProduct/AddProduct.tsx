import React, {FormEvent, useEffect, useState} from "react";
import {CreateProductEntity, ProductEntity, ProductImageObj} from 'types';
import {selectKindProductsDependingOnCategory} from "../../../../utils/selectKindProductsDependingOnCategory";
import {selectImgObjDependOnKindProduct} from "../../../../utils/selectImgObjDependOnKindProduct";
import {fetchApi} from "../../../../utils/fetchApi";
import {errorHandling} from "../../../../utils/errorHandling";
import {Spinner} from "../../../common/Spinner/Spinner";
import {AdminBtn} from "../../../common/AdminBtn/AdminBtn";
import {ErrorShow} from "../../../ErrorShow/ErrorShow";
import {AddAndEditProductForm} from "../AddAndEditProductForm/AddAndEditProductForm";
import {productEntityInitial} from "../../../../utils/productEntityInitial";
import './AddProduct.css';

export const AddProduct = () => {
    const [form, setForm] = useState<CreateProductEntity>(productEntityInitial);
    const [loading, setLoading] = useState<boolean>(false);
    const [productsKindField, setProductsKindField] = useState<string[] | []>([]);
    const [errorInfo, setErrorInfo] = useState<string>('');
    const [imagesToDisplay, setImagesToDisplay] = useState<ProductImageObj[] | null>(null);
    const [curObj, setCurObj] = useState<ProductImageObj | null>(null);
    const [resultInfo, setResultInfo] = useState<string>('');
    const [productId, setProductId] = useState<string>('');

    useEffect(() => {
        (async () => {
            setImagesToDisplay(null);
            selectKindProductsDependingOnCategory(form.category, setProductsKindField);

            if (form.productKind) {
                selectImgObjDependOnKindProduct(form.productKind, setImagesToDisplay)
            }
        })()
    }, [form.category, form.productKind]);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            setLoading(true)
            const res = await fetchApi('admin/product', 'POST', form as CreateProductEntity);
            await errorHandling(res, setErrorInfo);
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
            <AddAndEditProductForm
                sendForm={sendForm}
                form={form}
                setForm={setForm}
                imagesToDisplay={imagesToDisplay}
                productsKindField={productsKindField}
                curObj={curObj}
                setCurObj={setCurObj}
                textBtn="Dodaj produkt"
            />
        </>
    )
}
