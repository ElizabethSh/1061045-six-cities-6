import {ActionType} from '../store/actionType';
import {offers} from '../mock/offers';

const initialState = {
  activeCity: `Paris`,
  offers
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return ({
        ...state,
        activeCity: action.payload
      });

    case ActionType.CITY_RESET:
      return {...initialState};

    default:
      return state;
  }
};
