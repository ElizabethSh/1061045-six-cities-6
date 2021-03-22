import {NameSpace} from "../root-reducer";

export const getPlaceInfo = (state) => state[NameSpace.PLACE_INFO].placeInfo;

export const getIsPlaceInfoLoaded = (state) => state[NameSpace.PLACE_INFO].isPlaceInfoLoaded;
