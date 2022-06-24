import {createContext} from "react";

//przyjmuje taką postać jak lokalny stan żeby łatwiej było tym zarządzać
export const SearchProductsContext = createContext({
    searchProducts: '',
    setSearchProducts: (p: string) => {}
});