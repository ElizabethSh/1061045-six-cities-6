import {ActionType} from "./actionType";

export const ActionCreator = {
  cityChangeAction: (activeCity) => ({
    type: ActionType.CITY_CHANGE,
    payload: activeCity,
  }),

  cityPlacesListChangeAction: () => ({
    type: ActionType.PLACE_LIST_CHANGE
  }),

  cityResetAction: () => ({
    type: ActionType.CITY_RESET,
  }),

  cardHoverAction: (cardId) => ({
    type: ActionType.CARD_HOVER,
    payload: cardId
  }),

  resetCardHoverAction: () => ({
    type: ActionType.CARD_HOVER_RESET,
  }),

  // устанавливает тип сортировки в сторе
  setSortTypeAction: (sortType) => ({
    type: ActionType.SORT_TYPE_CHANGE,
    payload: sortType
  }),
};
