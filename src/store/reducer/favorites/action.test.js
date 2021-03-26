import {ActionType} from "../../action-type";
import {loadFavorites, resetFavorites} from "./action";

describe(`Action creators work correctly`, () => {
  it(`Action creator for loading favorites returns action with loaded data`, () => {
    const loadedFavoritePlaces = [{}, {}, {}];
    const expectedAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: loadedFavoritePlaces
    };

    expect(loadFavorites(loadedFavoritePlaces))
      .toEqual(expectedAction);
  });

  it(`Action creator for reset favorites returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_FAVORITES
    };

    expect(resetFavorites())
      .toEqual(expectedAction);
  });
});
