import {ActionType} from '../store/actionType';
import {getCityPlaces} from '../common/utils';
import {AuthStatus, SortType} from '../common/const';

const initialState = {
  activeCity: `Paris`,
  offers: [],
  activeCard: 0,
  activeCityPlaces: [],
  sortType: SortType.POPULAR,
  sortedPlaces: [],
  authStatus: AuthStatus.NO_AUTH,
  isDataLoaded: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return ({
        ...state,
        activeCity: action.payload
      });

    case ActionType.CHANGE_PLACE_LIST:
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

    case ActionType.RESET_CARD_HOVER:
      return ({
        ...state,
        activeCard: 0,
      });

    case ActionType.CHANGE_SORT_TYPE:
      return ({
        ...state,
        sortType: action.payload
      });

    case ActionType.SORT_PLACES_LIST:
      return ({
        ...state,
        sortedPlaces: action.payload
      });

    case ActionType.LOAD_OFFERS:
      return ({
        ...state,
        offers: action.payload,
        isDataLoaded: true
      });

    case ActionType.REQUIRED_AUTH:
      return ({
        ...state,
        authStatus: action.payload
      });

    default:
      return state;
  }
};
