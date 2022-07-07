import {createContext} from "react";

export const ProductFormImageContext = createContext({
    productFormImage: '',
    setProductFormImage: (s: string) => {}
});