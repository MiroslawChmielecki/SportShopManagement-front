import React from "react";
import {productImages} from "../../../utils/product.images";

interface Props {
    productCategory: string;
    productKind: string;
}

export const SelectImage = (props: Props) => {
    const {productCategory, productKind} = props;


    return (
        <>
            <p>Wybierz zdjęcie produktu z kategorii {productCategory} i rodzaju {[productKind]}</p>
            <ul>
                {
                    productImages.Badminton.Rackets.map((oneImg) => (
                        <li key={oneImg.id}>
                            <p>{oneImg.name} a jego id to: {oneImg.id}</p>
                            <img src={oneImg.img} width={40} height={30}/>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}