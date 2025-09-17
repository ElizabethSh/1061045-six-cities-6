import MockAdapter from "axios-mock-adapter";
import { ActionType } from "../../action-type";
import { fetchPlaceAction } from "../../api-actions";
import { placeInfo } from "./place-info";
import { APIRoute } from "../../../common/const";
import { api } from "../../../test-utils/mock-store";

describe(`Reducer 'placeInfo' works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(placeInfo(undefined, {})).toEqual({
      placeInfo: null,
      isPlaceInfoLoaded: false,
    });
  });

  it(`Reducer should update place information by load data`, () => {
    const state = { placeInfo: null, isPlaceInfoLoaded: false };

    const loadPlaceInfoAction = {
      type: ActionType.LOAD_PLACE_INFO,
      payload: {},
    };

    expect(placeInfo(state, loadPlaceInfoAction)).toEqual({
      placeInfo: {},
      isPlaceInfoLoaded: true,
    });
  });

  it(`Reducer should return default`, () => {
    const state = { placeInfo: null, isPlaceInfoLoaded: false };

    const resetPlaceInfoAction = {
      type: ActionType.RESET_PLACE_INFO,
      payload: null,
    };

    expect(
      placeInfo(
        { placeInfo: null, isPlaceInfoLoaded: true },
        resetPlaceInfoAction
      )
    ).toEqual(state);

    expect(
      placeInfo(
        { placeInfo: null, isPlaceInfoLoaded: false },
        resetPlaceInfoAction
      )
    ).toEqual(state);
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call (GET) to /hotels/: id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeId = "100";
    const placeLoader = fetchPlaceAction(fakeId);

    apiMock.onGet(`${APIRoute.OFFERS}/${fakeId}`).reply(200, {
      bedrooms: 4,
      city: { name: `Berlin`, location: {} },
      description: ``,
      goods: [`Breakfast`],
      host: {
        id: "25",
        name: `Maria`,
        isPro: true,
        avatarUrl: `img/avatar-angelina.jpg`,
      },
      id: fakeId,
      images: [``],
      isFavorite: false,
      isPremium: false,
      location: {},
      maxAdults: 7,
      previewImage: ``,
      price: 237,
      rating: 3.6,
      title: ``,
      type: ``,
    });

    return placeLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_PLACE_INFO,
        payload: {
          bedrooms: 4,
          city: { name: `Berlin`, location: {} },
          description: ``,
          goods: [`Breakfast`],
          host: {
            id: "25",
            name: `Maria`,
            isPro: true,
            avatarUrl: `img/avatar-angelina.jpg`,
          },
          id: fakeId,
          images: [``],
          isFavorite: false,
          isPremium: false,
          location: {},
          maxAdults: 7,
          previewImage: ``,
          price: 237,
          rating: 3.6,
          title: ``,
          type: ``,
        },
      });
    });
  });
});
