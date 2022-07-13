import { CreateProductEntity } from "types"
import {Dispatch, SetStateAction} from "react";

export const updateForm = (
    form: CreateProductEntity,
    setForm: Dispatch<SetStateAction<CreateProductEntity>>,
    key: string,
    value: string | number) =>
{
    setForm(form => ({
            ...form,
            [key]: value,
        }
    ))
}

export const updateFormProductAndKind = (
    form: CreateProductEntity,
    setForm: Dispatch<SetStateAction<CreateProductEntity>>,
    key: string,
    value: string | number) =>
{
    setForm(form => ({
            ...form,
            [key]: value,
        }
    ))
    form.productKind = '';
    form.image = '';
}


