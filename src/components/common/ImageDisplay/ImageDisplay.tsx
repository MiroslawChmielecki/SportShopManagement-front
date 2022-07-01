import React from "react";
import SoccerSocks1 from "../../../images/soccerSocks/soccerSocks1.png";


interface Props {
    productName: string
}

export const ImageDisplay = (props: Props) => {

    return <img src={SoccerSocks1} height={50} width={70}/>
}