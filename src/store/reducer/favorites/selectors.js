import {NameSpace} from "../root-reducer";

export const getFavoritePlaces = (state) => state[NameSpace.FAVORITE].favorites;

export const getIsFavoritesLoaded = (state) => state[NameSpace.FAVORITE].isFavoritesLoaded;
