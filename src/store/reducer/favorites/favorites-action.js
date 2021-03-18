import {ActionType} from "../../action-type";

export const loadFavorites = (data) => {
  return {
    type: ActionType.LOAD_FAVORITES,
    payload: data
  };
};

export const resetFavorites = () => {
  return {
    type: ActionType.RESET_FAVORITES
  };
};
