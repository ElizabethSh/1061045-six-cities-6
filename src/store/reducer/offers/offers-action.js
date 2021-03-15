import {ActionType} from "../../action-type";


export const changeCity = (activeCity) => ({
  type: ActionType.CITY_CHANGE,
  payload: activeCity,
});

export const changeCityPlacesList = () => ({
  type: ActionType.CHANGE_PLACE_LIST,
});

export const resetCity = () => ({
  type: ActionType.CITY_RESET,
});

export const setCardHover = (cardId) => ({
  type: ActionType.CARD_HOVER,
  payload: cardId
});

export const resetCardHover = () => ({
  type: ActionType.RESET_CARD_HOVER,
});

export const loadOffers = (data) => {
  return ({
    type: ActionType.LOAD_OFFERS,
    payload: data
  });
};

export const changeFavoriteStatus = (data) => {
  return {
    type: ActionType.CHANGE_FAVORITE_STATUS,
    payload: data
  };
};
