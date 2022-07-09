import React, {useState} from 'react';
import {Main} from "./components/layout/Main/Main";
import {Footer} from "./components/layout/Footer/Footer";
import {Header} from "./components/layout/Header/Header";
import {SearchProductsContext} from "./context/search.context";
import './App.css'


export const App = () => {
    const [searchProducts, setSearchProducts] = useState('');

    return (
        <SearchProductsContext.Provider value={{searchProducts, setSearchProducts}}>
            <div className='App'>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        </SearchProductsContext.Provider>
    );
};


