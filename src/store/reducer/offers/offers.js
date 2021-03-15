import {ActionType} from '../../action-type';
import {getCityPlaces, updateOffers} from '../../../common/utils';

const initialState = {
  activeCity: `Paris`,
  offers: [],
  isOffersLoaded: false,
  activeCard: 0,
  activeCityPlaces: [],
};

export const offers = (state = initialState, action) => {
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

    case ActionType.LOAD_OFFERS:
      return ({
        ...state,
        offers: action.payload,
        isOffersLoaded: true
      });

    case ActionType.CHANGE_FAVORITE_STATUS:
      return ({
        ...state,
        offers: updateOffers(state.offers, action.payload),
      });

    default:
      return state;
  }
};
