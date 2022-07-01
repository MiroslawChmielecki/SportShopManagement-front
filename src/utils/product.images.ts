import SoccerBall1 from '../images/soccerBalls/soccerBall1.png';
import SoccerBall2 from '../images/soccerBalls/soccerBall2.png';
import SoccerBall3 from '../images/soccerBalls/soccerBall3.png';
import SoccerBall4 from '../images/soccerBalls/soccerBall4.png';
import SoccerBall5 from '../images/soccerBalls/soccerBall5.png';
import SoccerBall6 from '../images/soccerBalls/soccerBall6.png';
import SoccerGloves1 from '../images/soccerGloves/soccerGloves1.png';
import SoccerGloves2 from '../images/soccerGloves/soccerGloves2.png';
import SoccerGloves3 from '../images/soccerGloves/soccerGloves3.png';
import SoccerGloves4 from '../images/soccerGloves/soccerGloves4.png';
import SoccerTShirt1 from '../images/soccerTShirts/soccerTShirt1.png';
import SoccerTShirt2 from '../images/soccerTShirts/soccerTshirt2.png';
import SoccerTShirt3 from '../images/soccerTShirts/soccerTshirt3.png';
import SoccerTShirt4 from '../images/soccerTShirts/soccerTshirt4.png';
import SoccerSocks1 from '../images/soccerSocks/soccerSocks1.png';
import SoccerSocks2 from '../images/soccerSocks/soccerSocks2.png';
import SoccerSocks3 from '../images/soccerSocks/soccerSocks3.png';
import SoccerSocks4 from '../images/soccerSocks/soccerSocks4.png';
import SoccerSocks5 from '../images/soccerSocks/soccerSocks5.png';
import BadmintonRacket1 from '../images/badmintonRackets/badmintonRacket1.png';
import BadmintonRacket2 from '../images/badmintonRackets/badmintonRacket2.png';
import BadmintonRacket3 from '../images/badmintonRackets/badmintonRacket3.png';
import BadmintonShuttlecock1 from '../images/badmintonShuttlecocks/badmintonShuttlecock1.png';
import BadmintonShuttlecock2 from '../images/badmintonShuttlecocks/badmintonShuttlecock2.png';
import BadmintonShuttlecock3 from '../images/badmintonShuttlecocks/badmintonShuttlecock3.png';
import BaseballStick1 from '../images/baseballSticks/baseballStick1.png';
import BaseballBall1 from '../images/baseballBalls/baseballBall1.png';
import BaseballBall2 from '../images/baseballBalls/baseballBall2.png';
import BasketballBackboard1 from '../images/basketballBackboards/basketballBackBoard1.png';
import BasketballBackboard2 from '../images/basketballBackboards/basketballBackBoard2.png';
import BasketballBackboard3 from '../images/basketballBackboards/basketballBackBoard3.png';
import BasketballBall1 from '../images/basketballBalls/basketballBall1.png';
import BasketballBall2 from '../images/basketballBalls/basketballBall2.png';
import BasketballBall3 from '../images/basketballBalls/basketballBall3.png';
import HockeyHelmet1 from '../images/hockeyHelmets/hockeyHelmet1.png';
import HockeyHelmet2 from '../images/hockeyHelmets/hockeyHelmet2.png';
import HockeyHelmet3 from '../images/hockeyHelmets/hockeyHelmet3.png';
import HockeyStick1 from '../images/hockeySticks/hockeyStick1.png';
import HockeyStick2 from '../images/hockeySticks/hockeyStick2.png';
import HockeyStick3 from '../images/hockeySticks/hockeyStick3.png';
import RugbyBall1 from '../images/rugbyBalls/RugbyBall1.png';
import RugbyBall2 from '../images/rugbyBalls/RugbyBall2.png';
import RugbyShirt1 from '../images/rugbyShirts/rugbyShirt1.png';
import RugbyShirt2 from '../images/rugbyShirts/rugbyShirt2.png';
import RugbyShirt3 from '../images/rugbyShirts/rugbyShirt3.png';
import TennisBalls1 from '../images/tennisBalls/tennisBalls1.png';
import TennisBalls2 from '../images/tennisBalls/tennisBalls2.png';
import TennisBalls3 from '../images/tennisBalls/tennisBalls3.png';
import TennisRacket1 from '../images/tennisRackets/tennisRacket1.png';
import TennisRacket2 from '../images/tennisRackets/tennisRacket2.png';
import TennisRacket3 from '../images/tennisRackets/tennisRacket3.png';
import TennisRacket4 from '../images/tennisRackets/tennisRacket4.png';

import {v4 as uuid} from 'uuid';
import { BadmintonRackets, BadmintonShuttlecocks, BaseballBalls, BaseballSticks, BasketballBackboards, BasketballBalls, HockeyHelmets, HockeySticks, RugbyBalls, RugbyShirts, SoccerBalls, SoccerGloves,
    SoccerSocks, SoccerTshirts, TennisBalls, TennisRackets,  } from 'types';

// export interface objProductImage {
//     id: string;
//     img: HTMLImageElement;
//     name: string;
// }

export const productImages = {

    //BADMINTON
    Badminton: {
        Rackets:[
            {
                id: uuid(),
                img: BadmintonRacket1,
                name: BadmintonRackets.BadmintonRacket1,
            },
            {
                id: uuid(),
                img: BadmintonRacket2,
                name: BadmintonRackets.BadmintonRacket2,
            },
            {
                id: uuid(),
                img: BadmintonRacket3,
                name: BadmintonRackets.BadmintonRacket3,
            }
        ],
        Shuttlecocks: [
            {
                id: uuid(),
                img: BadmintonShuttlecock1,
                name: BadmintonShuttlecocks.BadmintonShuttlecock1,
            },
            {
                id: uuid(),
                img: BadmintonShuttlecock2,
                name: BadmintonShuttlecocks.BadmintonShuttlecock2,
            },
            {
                id: uuid(),
                img: BadmintonShuttlecock3,
                name: BadmintonShuttlecocks.BadmintonShuttlecock3,
            },
        ]
    },

    //BASEBALL
    Baseball: {
        Balls: [
            {
                id: uuid(),
                img: BaseballBall1,
                name: BaseballBalls.BaseballBall1,
            },
            {
                id: uuid(),
                img: BaseballBall2,
                name: BaseballBalls.BaseballBall2,
            },
        ],
        Sticks: [
            {
                id: uuid(),
                img: BaseballStick1,
                name: BaseballSticks.BaseballStick1,
            },
        ],
    },

    //BASKETBALL
    Basketball: {
        Backboards: [
            {
                id: uuid(),
                img: BasketballBackboard1,
                name:BasketballBackboards.BasketballBackboard1,
            },
            {
                id: uuid(),
                img: BasketballBackboard2,
                name:BasketballBackboards.BasketballBackboard2,
            },
            {
                id: uuid(),
                img: BasketballBackboard3,
                name:BasketballBackboards.BasketballBackboard3,
            },
        ],
        Balls: [
            {
                id: uuid(),
                img: BasketballBall1,
                name:BasketballBalls.BasketballBall1,
            },
            {
                id: uuid(),
                img: BasketballBall2,
                name:BasketballBalls.BasketballBall2,
            },
            {
                id: uuid(),
                img: BasketballBall3,
                name:BasketballBalls.BasketballBall3,
            },
        ],
    },
    Hockey: {
        Helmets: [
            {
                id: uuid(),
                img: HockeyHelmet1,
                name: HockeyHelmets.HockeyHelmet1,
            },
            {
                id: uuid(),
                img: HockeyHelmet2,
                name: HockeyHelmets.HockeyHelmet2,
            },
            {
                id: uuid(),
                img: HockeyHelmet3,
                name: HockeyHelmets.HockeyHelmet3,
            },
        ],
        Sticks: [
            {
                id: uuid(),
                img: HockeyStick1,
                name: HockeySticks.HockeyStick1,
            },
            {
                id: uuid(),
                img: HockeyStick2,
                name: HockeySticks.HockeyStick2,
            },
            {
                id: uuid(),
                img: HockeyStick3,
                name: HockeySticks.HockeyStick3,
            },
        ],
    },
    Rugby: {
        Balls: [
            {
                id: uuid(),
                img: RugbyBall1,
                name: RugbyBalls.RugbyBall1,
            },
            {
                id: uuid(),
                img: RugbyBall2,
                name: RugbyBalls.RugbyBall2,
            },
        ],
        Shirts: [
            {
                id: uuid(),
                img: RugbyShirt1,
                name: RugbyShirts.RugbyShirt1,
            },
            {
                id: uuid(),
                img: RugbyShirt2,
                name: RugbyShirts.RugbyShirt2,
            },
            {
                id: uuid(),
                img: RugbyShirt3,
                name: RugbyShirts.RugbyShirt3,
            },
        ],
    },
    Soccer: {
        Balls: [
            {
                id: uuid(),
                img: SoccerBall1,
                name: SoccerBalls.SoccerBall1,
            },
            {
                id: uuid(),
                img: SoccerBall2,
                name: SoccerBalls.SoccerBall2,
            },
            {
                id: uuid(),
                img: SoccerBall3,
                name: SoccerBalls.SoccerBall3,
            },
            {
                id: uuid(),
                img: SoccerBall4,
                name: SoccerBalls.SoccerBall4,
            },
            {
                id: uuid(),
                img: SoccerBall5,
                name: SoccerBalls.SoccerBall5,
            },
            {
                id: uuid(),
                img: SoccerBall6,
                name: SoccerBalls.SoccerBall6,
            },
        ],
        Gloves: [
            {
                id: uuid(),
                img: SoccerGloves1,
                name: SoccerGloves.SoccerGloves1,
            },
            {
                id: uuid(),
                img: SoccerGloves2,
                name: SoccerGloves.SoccerGloves2,
            },
            {
                id: uuid(),
                img: SoccerGloves3,
                name: SoccerGloves.SoccerGloves3,
            },
            {
                id: uuid(),
                img: SoccerGloves4,
                name: SoccerGloves.SoccerGloves4,
            },
        ],
        TShirts: [
            {
                id: uuid(),
                img: SoccerTShirt1,
                name: SoccerTshirts.SoccerTShirts1,
            },
            {
                id: uuid(),
                img: SoccerTShirt2,
                name: SoccerTshirts.SoccerTShirts2,
            },
            {
                id: uuid(),
                img: SoccerTShirt3,
                name: SoccerTshirts.SoccerTShirts3,
            },
            {
                id: uuid(),
                img: SoccerTShirt4,
                name: SoccerTshirts.SoccerTShirts4,
            },
        ],
        Socks: [
            {
                id: uuid(),
                img: SoccerSocks1,
                name: SoccerSocks.SoccerSocks1,
            },
            {
                id: uuid(),
                img: SoccerSocks2,
                name: SoccerSocks.SoccerSocks2,
            },
            {
                id: uuid(),
                img: SoccerSocks3,
                name: SoccerSocks.SoccerSocks3,
            },
            {
                id: uuid(),
                img: SoccerSocks4,
                name: SoccerSocks.SoccerSocks4,
            },
            {
                id: uuid(),
                img: SoccerSocks5,
                name: SoccerSocks.SoccerSocks5,
            },
        ],
    },
    Tennis: {
        Balls: [
            {
                id: uuid(),
                img: TennisBalls1,
                name: TennisBalls.TennisBall1,
            },
            {
                id: uuid(),
                img: TennisBalls2,
                name: TennisBalls.TennisBall2,
            },
            {
                id: uuid(),
                img: TennisBalls3,
                name: TennisBalls.TennisBall3,
            },
        ],
        Rackets: [
            {
                id: uuid(),
                img: TennisRacket1,
                name: TennisRackets.TennisRacket1,
            },
            {
                id: uuid(),
                img: TennisRacket2,
                name: TennisRackets.TennisRacket2,
            },
            {
                id: uuid(),
                img: TennisRacket3,
                name: TennisRackets.TennisRacket3,
            },
            {
                id: uuid(),
                img: TennisRacket4,
                name: TennisRackets.TennisRacket4,
            },
        ],
    }
}







