import {ActionType} from '../../action-type';
import {updateOffers} from '../../../common/utils';

const initialState = {
  activeCity: `Paris`,
  offers: [],
  isOffersLoaded: false,
  isError: false
};

export const offers = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return ({
        ...state,
        offers: action.payload,
        isOffersLoaded: true
      });

    case ActionType.RESET_OFFERS:
      return ({
        ...state,
        isOffersLoaded: false
      });

    case ActionType.CITY_CHANGE:
      return ({
        ...state,
        activeCity: action.payload
      });

    case ActionType.CITY_RESET:
      return ({
        ...state,
        activeCity: initialState.activeCity
      });

    case ActionType.CHANGE_FAVORITE_STATUS:
      return ({
        ...state,
        offers: updateOffers(state.offers, action.payload),
      });

    case ActionType.CHANGE_ERROR_STATUS:
      return ({
        ...state,
        isError: action.payload
      });

    default:
      return state;
  }
};
