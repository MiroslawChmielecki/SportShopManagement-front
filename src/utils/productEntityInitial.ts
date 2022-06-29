import {CreateProductEntity, ProductCategory } from "types";

export const productEntityInitial: CreateProductEntity = {
    name: '',
    imgPath: '',
    description: '',
    price: 0,
    category: ProductCategory.soccer,
    brand: '',
    dateAdded: '',
    quantity: 0,
};

export const productEntityInitialWithId = {
    id: '',
    name: '',
    imgPath: '',
    description: '',
    price: 0,
    category: ProductCategory.soccer,
    brand: '',
    dateAdded: '',
    quantity: 0,
}