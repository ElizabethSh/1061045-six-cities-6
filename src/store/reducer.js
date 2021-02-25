import {ActionType} from '../store/actionType';
import {offers} from '../mock/offers';
import {getCityPlaces} from '../common/utils';

const initialState = {
  activeCity: `Paris`,
  offers,
  activeCard: 0,
  activeCityPlaces: []
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

    default:
      return state;
  }
};
