import {ActionType} from "./actionType";

export const ActionCreator = {
  cityChangeAction: (activeCity) => ({
    type: ActionType.CITY_CHANGE,
    payload: activeCity,
  }),

  cityPlacesListChangeAction: () => ({
    type: ActionType.CHANGE_PLACE_LIST
  }),

  cityResetAction: () => ({
    type: ActionType.CITY_RESET,
  }),

  cardHoverAction: (cardId) => ({
    type: ActionType.CARD_HOVER,
    payload: cardId
  }),

  resetCardHoverAction: () => ({
    type: ActionType.RESET_CARD_HOVER,
  }),

  // устанавливает тип сортировки в сторе
  setSortTypeAction: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType
  }),

  sortPlacesListAction: (sortedList) => {
    return ({
      type: ActionType.SORT_PLACES_LIST,
      payload: sortedList
    });
  },

  loadDataAction: (data) => {
    return ({
      type: ActionType.LOAD_OFFERS,
      payload: data
    });
  },

  setAuthStatusAction: (status) => {
    return {
      type: ActionType.REQUIRED_AUTH,
      payload: status
    };
  },

  setUsersEmailAction: (email) => {
    return {
      type: ActionType.SET_USERS_EMAIL,
      payload: email
    };
  }
};
