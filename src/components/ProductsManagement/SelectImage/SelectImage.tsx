import React, {useContext, useEffect, useState} from "react";
import {
    BadmintonProductKind, BaseballProductKind, BasketballProductKind,
    HockeyProductKind, RugbyProductKind, SoccerProductKind, TennisProductKind
} from "types";
import {productImages} from "../../../utils/product.images";
import {ProductImageObj} from 'types';
import {AdminBtn} from "../../common/AdminBtn/AdminBtn";
import {ProductFormImageContext} from "../../../context/productFormImage.context";
import './SelectImage.css'

interface Props {
    productKind: string;
}

export const SelectImage = (props: Props) => {
    const {productKind} = props;
    const {Badminton, Baseball, Basketball, Rugby, Hockey, Tennis, Soccer} = productImages
    const [imagesToDisplay, setImagesToDisplay] = useState<ProductImageObj[] | null>(null);
    const [curObj, setCurObj] = useState<ProductImageObj | null>(null);
    const {setProductFormImage} = useContext(ProductFormImageContext)


    useEffect(() => {
        (async () => {
            setImagesToDisplay(null)

            switch (productKind) {
                case BadmintonProductKind.rackets:
                    setImagesToDisplay(Badminton.Rackets)
                    break;
                case BadmintonProductKind.shuttlecocks:
                    setImagesToDisplay(Badminton.Shuttlecocks)
                    break;
                case BaseballProductKind.balls:
                    setImagesToDisplay(Baseball.Balls)
                    break;
                case BaseballProductKind.sticks:
                    setImagesToDisplay(Baseball.Sticks)
                    break;
                case BasketballProductKind.balls:
                    setImagesToDisplay(Basketball.Balls)
                    break;
                case BasketballProductKind.backboards:
                    setImagesToDisplay(Basketball.Backboards)
                    break;
                case HockeyProductKind.helmets:
                    setImagesToDisplay(Hockey.Helmets)
                    break;
                case HockeyProductKind.sticks:
                    setImagesToDisplay(Hockey.Sticks)
                    break;
                case RugbyProductKind.balls:
                    setImagesToDisplay(Rugby.Balls)
                    break;
                case RugbyProductKind.tshirts:
                    setImagesToDisplay(Rugby.Shirts)
                    break;
                case SoccerProductKind.socks:
                    setImagesToDisplay(Soccer.Socks)
                    break;
                case SoccerProductKind.tshirts:
                    setImagesToDisplay(Soccer.TShirts)
                    break;
                case SoccerProductKind.balls:
                    setImagesToDisplay(Soccer.Balls)
                    break;
                case SoccerProductKind.gloves:
                    setImagesToDisplay(Soccer.Gloves)
                    break;
                case TennisProductKind.rackets:
                    setImagesToDisplay(Tennis.Rackets)
                    break;
                case TennisProductKind.balls:
                    setImagesToDisplay(Tennis.Balls)
                    break;
            }
        })()
    }, [productKind]);

    if (imagesToDisplay === null) return null;

    const handleClickImage = (image: string, imgObj: ProductImageObj) => {
        setCurObj(imgObj);
        setProductFormImage(image)
    }

    return (
        <>
            <p>-----------------------------------------------------------------</p>
            <p>Wybierz zdjęcie do produktu z rodzaju: <strong>{productKind}</strong></p>

            <ul style={{margin: '20px auto'}}>
                {
                    imagesToDisplay.map((oneImg,index) => (
                        <li
                            className={oneImg === curObj ? "active" : ""}
                            key={oneImg.id}>
                            <p>{oneImg.name}</p>
                            <img src={oneImg.img} width={50} height={40}/>
                            <AdminBtn text="Wybierz" onClick={() => handleClickImage(oneImg.img, oneImg)}/>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}