import { BadmintonProductKind, BaseballProductKind, BasketballProductKind, HockeyProductKind, RugbyProductKind, SoccerProductKind, TennisProductKind } from "types";
import {productImages} from "./product.images";
const {Badminton, Baseball, Basketball, Rugby, Hockey, Tennis, Soccer} = productImages

export const selectImgDependOnKindProduct = (productKind: string, setImages: any) => {
    switch (productKind) {
        case BadmintonProductKind.rackets:
            setImages(Badminton.Rackets)
            break;
        case BadmintonProductKind.shuttlecocks:
            setImages(Badminton.Shuttlecocks)
            break;
        case BaseballProductKind.balls:
            setImages(Baseball.Balls)
            break;
        case BaseballProductKind.sticks:
            setImages(Baseball.Sticks)
            break;
        case BasketballProductKind.balls:
            setImages(Basketball.Balls)
            break;
        case BasketballProductKind.backboards:
            setImages(Basketball.Backboards)
            break;
        case HockeyProductKind.helmets:
            setImages(Hockey.Helmets)
            break;
        case HockeyProductKind.sticks:
            setImages(Hockey.Sticks)
            break;
        case RugbyProductKind.balls:
            setImages(Rugby.Balls)
            break;
        case RugbyProductKind.tshirts:
            setImages(Rugby.Shirts)
            break;
        case SoccerProductKind.socks:
            setImages(Soccer.Socks)
            break;
        case SoccerProductKind.tshirts:
            setImages(Soccer.TShirts)
            break;
        case SoccerProductKind.balls:
            setImages(Soccer.Balls)
            break;
        case SoccerProductKind.gloves:
            setImages(Soccer.Gloves)
            break;
        case TennisProductKind.rackets:
            setImages(Tennis.Rackets)
            break;
        case TennisProductKind.balls:
            setImages(Tennis.Balls)
            break;
    }
}