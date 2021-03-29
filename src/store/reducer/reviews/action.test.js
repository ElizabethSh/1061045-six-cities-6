import {ActionType} from "../../action-type";
import {loadReviews, resetReviews} from "./action";

describe(`Action creators work correctly`, () => {
  it(`Action creator for loading reviews returns action with loaded data`, () => {
    const loadedReviews = [{}, {}, {}];
    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: loadedReviews
    };

    expect(loadReviews(loadedReviews))
      .toEqual(expectedAction);
  });

  it(`Action creator for reset reviews returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_REVIEWS
    };

    expect(resetReviews())
      .toEqual(expectedAction);
  });
});
