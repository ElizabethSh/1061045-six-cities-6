import { ActionType } from "../../action-type";

const initialState = {
  nearPlaces: [],
  isNearPlacesLoaded: false,
};

export const nearPlaces = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_NEAR_PLACES:
      return {
        ...state,
        nearPlaces: action.payload,
        isNearPlacesLoaded: true,
      };

    case ActionType.RESET_NEAR_PLACES:
      return {
        ...state,
        nearPlaces: [],
        isNearPlacesLoaded: false,
      };

    default:
      return state;
  }
};

// Selectors
export const getNearPlaces = (state) => state.NEAR_PLACE.nearPlaces;
export const getIsNearPlacesLoaded = (state) =>
  state.NEAR_PLACE.isNearPlacesLoaded;
