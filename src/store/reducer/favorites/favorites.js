import {ActionType} from "../../action-type";

const initialState = {
  favorites: [],
  isFavoritesLoaded: false,
};

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAVORITES:
      return ({
        ...state,
        favorites: action.payload,
        isFavoritesLoaded: true
      });

    case ActionType.RESET_FAVORITES:
      return ({
        ...state,
        isFavoritesLoaded: false
      });

    default:
      return state;
  }
};
