import {
    BadmintonProductKind,
    BaseballProductKind,
    BasketballProductKind,
    HockeyProductKind,
    ProductCategory,
    RugbyProductKind,
    SoccerProductKind,
    TennisProductKind
} from "types";


export const selectKindProductsDependingOnCategory = (category: string, setKinds: any) => {

    switch (category) {
        case ProductCategory.badminton:
         setKinds((Object.keys(BadmintonProductKind) as (keyof typeof BadmintonProductKind)[]).map(
                product => BadmintonProductKind[product]
            ))
            break;

        case ProductCategory.baseball:
           setKinds((Object.keys(BaseballProductKind) as (keyof typeof BaseballProductKind)[]).map(
                product => BaseballProductKind[product]
            ))
            break;

        case ProductCategory.basketball:
             setKinds((Object.keys(BasketballProductKind) as (keyof typeof BasketballProductKind)[]).map(
                product => BasketballProductKind[product]
            ))
            break;

        case ProductCategory.hockey:
            setKinds((Object.keys(HockeyProductKind) as (keyof typeof HockeyProductKind)[]).map(
                product => HockeyProductKind[product]
            ))
            break;

        case ProductCategory.rugby:
            setKinds((Object.keys(RugbyProductKind) as (keyof typeof RugbyProductKind)[]).map(
                product => RugbyProductKind[product]
            ))
            break;

        case ProductCategory.soccer:
            setKinds((Object.keys(SoccerProductKind) as (keyof typeof SoccerProductKind)[]).map(
                product => SoccerProductKind[product]
            ))
            break;

        case ProductCategory.tennis:
            setKinds((Object.keys(TennisProductKind) as (keyof typeof TennisProductKind)[]).map(
                product => TennisProductKind[product]
            ))
            break;
    }
}