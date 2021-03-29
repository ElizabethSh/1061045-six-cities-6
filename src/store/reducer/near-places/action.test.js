import {ActionType} from "../../action-type";
import {loadNearPlaces, resetNearPlaces} from "./action";

describe(`Action creators work correctly`, () => {
  it(`Action creator for loading near places returns action with loaded data`, () => {
    const loadedNearPlaces = [{}, {}, {}];

    const expectedAction = {
      type: ActionType.LOAD_NEAR_PLACES,
      payload: loadedNearPlaces
    };

    expect(loadNearPlaces(loadedNearPlaces))
      .toEqual(expectedAction);
  });

  it(`Action creator for reset near places list returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_NEAR_PLACES
    };

    expect(resetNearPlaces())
      .toEqual(expectedAction);
  });
});
