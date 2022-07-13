import {CreateProductEntity, ProductCategory } from "types";

export const productEntityInitial: CreateProductEntity = {
    name: '',
    description: '',
    price: 0,
    category: ProductCategory.soccer,
    productKind: '',
    image: '',
    brand: '',
    dateAdded: '',
    quantity: 0,
};

export const productEntityInitialWithId = {
    id: '',
   ...productEntityInitial,
}