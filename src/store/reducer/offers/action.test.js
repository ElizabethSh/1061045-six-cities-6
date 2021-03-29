import {ActionType} from "../../action-type";
import {changeCity, changeErrorStatus, changeFavoriteStatus, loadOffers, resetCity, resetOffers} from "./action";

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing city returns action with given city`, () => {
    const expectedAction = {
      type: ActionType.CITY_CHANGE,
      payload: `København`
    };

    expect(changeCity(`København`))
      .toEqual(expectedAction);
  });

  it(`Action creator for reset city filter returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.CITY_RESET,
    };

    expect(resetCity())
      .toEqual(expectedAction);
  });

  it(`Action creator for loading offers returns action with loaded data`, () => {
    const loadedOffers = [{}, {}, {}, {}];
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: loadedOffers
    };

    expect(loadOffers(loadedOffers))
      .toEqual(expectedAction);
  });

  it(`Action creator for reset offers returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_OFFERS
    };

    expect(resetOffers())
      .toEqual(expectedAction);
  });

  it(`Action creator for changing favorite status returns action with updated place`, () => {
    const updatedPlace = {};
    const expectedAction = {
      type: ActionType.CHANGE_FAVORITE_STATUS,
      payload: updatedPlace
    };

    expect(changeFavoriteStatus(updatedPlace))
      .toEqual(expectedAction);
  });

  it(`Action creator for changing error status returns action with given status`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_ERROR_STATUS,
      payload: true
    };

    expect(changeErrorStatus(true))
      .toEqual(expectedAction);
  });
});
