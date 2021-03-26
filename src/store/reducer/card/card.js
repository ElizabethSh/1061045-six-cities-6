import {ActionType} from "../../action-type";

const initialState = {
  activeCard: 0,
};

export const card = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
