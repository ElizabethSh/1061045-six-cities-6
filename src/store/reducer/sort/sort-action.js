import {SortType} from "../../../common/const";
import {ActionType} from "../../action-type";
import {
  sortOffersByRating,
  sortOffersHightToLowPrice,
  sortOffersLowToHightPrice
} from "../../../common/sort";

export const setSortType = (sortType) => ({
  type: ActionType.CHANGE_SORT_TYPE,
  payload: sortType
});

export const sortPlacesList = (activeCityPlaces, sortType) => {
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
};
