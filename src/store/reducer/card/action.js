import {ActionType} from "../../action-type";

export const setCardHover = (cardId) => ({
  type: ActionType.CARD_HOVER,
  payload: cardId
});

export const resetCardHover = () => ({
  type: ActionType.RESET_CARD_HOVER,
});
