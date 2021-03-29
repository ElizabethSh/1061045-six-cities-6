import {ActionType} from "../../action-type";

export const changeCity = (activeCity) => ({
  type: ActionType.CITY_CHANGE,
  payload: activeCity,
});

export const resetCity = () => ({
  type: ActionType.CITY_RESET,
});

export const loadOffers = (data) => {
  return ({
    type: ActionType.LOAD_OFFERS,
    payload: data
  });
};

export const resetOffers = () => {
  return {
    type: ActionType.RESET_OFFERS
  };
};

export const changeFavoriteStatus = (data) => {
  return {
    type: ActionType.CHANGE_FAVORITE_STATUS,
    payload: data
  };
};

export const changeErrorStatus = (status) => {
  return {
    type: ActionType.CHANGE_ERROR_STATUS,
    payload: status
  };
};
