import MockAdapter from "axios-mock-adapter";
import { APIRoute } from "../../../common/const";
import { ActionType } from "../../action-type";
import { fetchNearPlacesAction } from "../../api-actions";
import { nearPlaces } from "./near-places";
import { api } from "../../../test-utils/mock-store";

describe(`Reducer 'nearPlaces' works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(nearPlaces(undefined, {})).toEqual({
      nearPlaces: [],
      isNearPlacesLoaded: false,
    });
  });

  it(`Reducer should update reviews by load reviews`, () => {
    const state = { nearPlaces: [], isNearPlacesLoaded: false };

    const loadNearPlacesAction = {
      type: ActionType.LOAD_NEAR_PLACES,
      payload: [{}, {}, {}],
    };

    expect(nearPlaces(state, loadNearPlacesAction)).toEqual({
      nearPlaces: [{}, {}, {}],
      isNearPlacesLoaded: true,
    });

    const notChangedNearPlacesAction = {
      type: ActionType.LOAD_NEAR_PLACES,
      payload: [],
    };

    expect(nearPlaces(state, notChangedNearPlacesAction)).toEqual({
      nearPlaces: [],
      isNearPlacesLoaded: true,
    });
  });

  it(`Reducer should return default`, () => {
    const resetNearPlacesAction = {
      type: ActionType.RESET_NEAR_PLACES,
      payload: 0,
    };

    expect(
      nearPlaces(
        { nearPlaces: [{}, {}], isNearPlacesLoaded: true },
        resetNearPlacesAction
      )
    ).toEqual({ nearPlaces: [], isNearPlacesLoaded: false });

    expect(
      nearPlaces(
        { nearPlaces: [], isNearPlacesLoaded: true },
        resetNearPlacesAction
      )
    ).toEqual({ nearPlaces: [], isNearPlacesLoaded: false });

    expect(
      nearPlaces(
        { nearPlaces: [], isNearPlacesLoaded: false },
        resetNearPlacesAction
      )
    ).toEqual({ nearPlaces: [], isNearPlacesLoaded: false });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call (GET) to /offers/:offer_id/nearby`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeId = 42;
    const loadNearPlaces = fetchNearPlacesAction(fakeId);

    apiMock.onGet(`${APIRoute.OFFERS}/${fakeId}/nearby`).reply(200, [
      {
        bedrooms: 5,
        city: { name: `Brussels`, location: {} },
        description: ``,
        goods: [`Breakfast`],
        host: {
          id: 25,
          name: `Angelina`,
          isPro: true,
          avatarUrl: `img/avatar-angelina.jpg`,
        },
        id: 96,
        images: [
          `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
        ],
        isFavorite: false,
        isPremium: false,
        location: { latitude: 50.839557, longitude: 4.346697, zoom: 16 },
        maxAdults: 8,
        previewImage: `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/2.jpg`,
        price: 405,
        rating: 2.4,
        title: ``,
        type: `apartment`,
      },
    ]);

    loadNearPlaces(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_NEAR_PLACES,
        payload: [
          {
            bedrooms: 5,
            city: { name: `Brussels`, location: {} },
            description: ``,
            goods: [`Breakfast`],
            host: {
              id: 25,
              name: `Angelina`,
              isPro: true,
              avatarUrl: `img/avatar-angelina.jpg`,
            },
            id: 96,
            images: [
              `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
            ],
            isFavorite: false,
            isPremium: false,
            location: { latitude: 50.839557, longitude: 4.346697, zoom: 16 },
            maxAdults: 8,
            previewImage: `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/2.jpg`,
            price: 405,
            rating: 2.4,
            title: ``,
            type: `apartment`,
          },
        ],
      });
    });
  });
});
