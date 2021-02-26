import {ActionType} from '../store/actionType';
import {offers} from '../mock/offers';
import {getCityPlaces} from '../common/utils';
import {SortType} from '../common/const';

const initialState = {
  activeCity: `Paris`,
  offers,
  activeCard: 0,
  activeCityPlaces: [],
  sortType: SortType.POPULAR,
  sortedPlaces: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return ({
        ...state,
        activeCity: action.payload
      });

    case ActionType.PLACE_LIST_CHANGE:
      return ({
        ...state,
        activeCityPlaces: getCityPlaces(state.offers, state.activeCity)
      });

    case ActionType.CITY_RESET:
      return ({
        ...state,
        activeCity: initialState.activeCity
      });

    case ActionType.CARD_HOVER:
      return ({
        ...state,
        activeCard: action.payload
      });

    case ActionType.CARD_HOVER_RESET:
      return ({
        ...state,
        activeCard: 0,
      });

    // --------------------------------------
    case ActionType.SORT_TYPE_CHANGE:
      return ({
        ...state,
        sortType: action.payload
      });

    case ActionType.SORT_PLACES_LIST:
      return ({
        ...state,
        sortedPlaces: action.payload
      });

    default:
      return state;
  }
};
