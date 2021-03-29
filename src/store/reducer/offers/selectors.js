import {createSelector} from "reselect";
import {getCityPlaces} from "../../../common/utils";
import {NameSpace} from "../root-reducer";

export const getOffers = (state) => state[NameSpace.OFFER].offers;
export const getActiveCity = (state) => state[NameSpace.OFFER].activeCity;

export const getActiveCityPlaces = createSelector(
    [getOffers, getActiveCity],
    (offers, activeCity) => getCityPlaces(offers, activeCity)
);
