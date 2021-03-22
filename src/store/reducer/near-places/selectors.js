import {NameSpace} from "../root-reducer";

export const getNearPlaces = (state) => state[NameSpace.NEAR_PLACE].nearPlaces;

export const getIsNearPlacesLoaded = (state) => state[NameSpace.NEAR_PLACE].isNearPlacesLoaded;
