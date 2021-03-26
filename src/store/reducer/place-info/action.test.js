import {ActionType} from "../../action-type";
import {loadPlaceInfo, resetPlaceInfo} from "./action";

describe(`Action creators work correctly`, () => {
  it(`Action creator for loading places information returns action with loaded data`, () => {
    const loadedPlaceInfo = {};
    const expectedAction = {
      type: ActionType.LOAD_PLACE_INFO,
      payload: loadedPlaceInfo
    };

    expect(loadPlaceInfo(loadedPlaceInfo))
      .toEqual(expectedAction);
  });

  it(`Action creator for reset places information returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_PLACE_INFO
    };

    expect(resetPlaceInfo())
      .toEqual(expectedAction);
  });
});
