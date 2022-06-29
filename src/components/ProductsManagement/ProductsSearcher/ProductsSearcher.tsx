import React, {SyntheticEvent, useContext, useState} from 'react';
import {SearchProductsContext} from "../../../context/search.context";
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";

export const ProductsSearcher = () => {
    const {searchProducts, setSearchProducts} = useContext(SearchProductsContext)
    const [inputValue, setInputValue] = useState(searchProducts);

    const setProductsSearchFromLocalState = (e: SyntheticEvent)  => {
        e.preventDefault();
        setSearchProducts(inputValue)
    }

    return (
        <>
            <form onSubmit={setProductsSearchFromLocalState}>
                <label> Wyszukaj produkty:
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                </label>
                <AdminBtn text="Wyświetl produkty"/>
            </form>
        </>
    )
}