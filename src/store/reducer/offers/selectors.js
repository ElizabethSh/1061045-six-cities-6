import {createSelector} from "reselect";
import {getCityPlaces} from "../../../common/utils";
import {NameSpace} from "../root-reducer";

export const getOffers = (state) => state[NameSpace.OFFER].offers;
export const getActiveCity = (state) => state[NameSpace.OFFER].activeCity;

export const getIsOffersLoaded = (state) => state[NameSpace.OFFER].isOffersLoaded;
export const getActiveCard = (state) => state[NameSpace.OFFER].activeCard;
export const getIsErrorStatus = (state) => state[NameSpace.OFFER].isError;

export const getActiveCityPlaces = createSelector(
    [getOffers, getActiveCity],
    (offers, activeCity) => getCityPlaces(offers, activeCity)
);
