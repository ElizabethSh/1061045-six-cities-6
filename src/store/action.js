import {SortType} from "../common/const";
import {sortOffersByRating, sortOffersHightToLowPrice, sortOffersLowToHightPrice} from "../common/sort";
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

  // -----------------------------------------------

  sortPlacesListAction: (sortType, activeCityPlaces) => {
    let sortedList = activeCityPlaces.slice();

    switch (sortType) {

      case SortType.TOP_RATED:
        sortOffersByRating(sortedList);
        break;

      case SortType.PRICE_HIGHT_TO_LOW:
        sortOffersHightToLowPrice(sortedList);
        break;

      case SortType.PRICE_LOW_TO_HIGHT:
        sortOffersLowToHightPrice(sortedList);
        break;

      default:
        break;
    }

    return ({
      type: ActionType.SORT_PLACES_LIST,
      payload: sortedList
    });
  }
};
