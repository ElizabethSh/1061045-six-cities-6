import {ActionType} from "../../action-type";
import {setCardHover} from "./action";
import {card} from "./card";

describe(`Reducer 'card' works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(card(undefined, {})).toEqual({activeCard: 0});
  });

  it(`Reducer should set active card to given value`, () => {
    const state = {activeCard: 0};

    expect(card(state, setCardHover(5)))
      .toEqual({activeCard: 5});
  });

  it(`Reducer should return default`, () => {
    const resetCardHoverAction = {
      type: ActionType.RESET_CARD_HOVER,
      payload: null
    };

    expect(card({activeCard: 3}, resetCardHoverAction))
      .toEqual({activeCard: 0});

    expect(card({activeCard: 0}, resetCardHoverAction))
      .toEqual({activeCard: 0});
  });
});
