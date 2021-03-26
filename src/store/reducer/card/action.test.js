import {ActionType} from "../../action-type";
import {resetCardHover, setCardHover} from "./action";

describe(`Action creators work correctly`, () => {
  it(`Action creator for update active card returns action with given payload`, () => {
    const cardId = 42;
    const expectedAction = {
      type: ActionType.CARD_HOVER,
      payload: cardId
    };

    expect(setCardHover(cardId))
      .toEqual(expectedAction);
  });

  it(`Action creator for reset active card returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_CARD_HOVER,
    };

    expect(resetCardHover())
      .toEqual(expectedAction);
  });
});
