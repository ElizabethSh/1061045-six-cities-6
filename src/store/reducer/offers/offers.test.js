import MockAdapter from 'axios-mock-adapter';
import {APIRoute} from '../../../common/const';
import {createAPI} from "../../../services/api";
import {ActionType} from "../../action-type";
import {addToFavorite, fetchOffersList} from '../../api-actions';
import {offers} from "./offers";

const api = createAPI(() => {});

describe(`Reducer 'offers' works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const state = {
      activeCity: `Paris`,
      offers: [],
      isOffersLoaded: false,
      isError: false,
      errorCode: null
    };

    expect(offers(undefined, {}))
      .toEqual(state);
  });

  it(`Reducer should update offers by loaded data`, () => {
    const state = {
      activeCity: `Paris`,
      offers: [],
      isOffersLoaded: false,
      isError: false,
      errorCode: null
    };

    const loadOffersAction = {
      type: ActionType.LOAD_OFFERS,
      payload: [{}, {}]
    };

    expect(offers(state, loadOffersAction))
      .toEqual({
        offers: [{}, {}], isOffersLoaded: true, activeCity: `Paris`, isError: false, errorCode: null
      });

    const notChangedOffersAction = {
      type: ActionType.LOAD_OFFERS,
      payload: []
    };

    expect(offers(state, notChangedOffersAction))
      .toEqual({
        offers: [], isOffersLoaded: true, activeCity: `Paris`, isError: false, errorCode: null
      });
  });

  it(`Reducer should return default if action type is RESET_OFFERS`, () => {
    const state = {
      activeCity: `Paris`,
      offers: [],
      isOffersLoaded: false,
      isError: false,
      errorCode: null
    };
    const resetOffersAction = {
      type: ActionType.RESET_OFFERS,
      payload: null
    };

    expect(offers({
      offers: [], isOffersLoaded: true, activeCity: `Paris`, isError: false, errorCode: null
    }, resetOffersAction)).toEqual(state);

    expect(offers({
      offers: [], isOffersLoaded: false, activeCity: `Paris`, isError: false, errorCode: null
    }, resetOffersAction)).toEqual(state);
  });

  it(`Reducer should set active city to given value`, () => {
    const state = {
      activeCity: `Paris`,
      offers: [],
      isOffersLoaded: false,
      isError: false,
      errorCode: null
    };

    const changeCityAction = {
      type: ActionType.CITY_CHANGE,
      payload: `Åarhus`
    };

    expect(offers(state, changeCityAction)).toEqual({
      activeCity: `Åarhus`, offers: [], isOffersLoaded: false, isError: false, errorCode: null
    });
  });

  it(`Reducer should return default if action type is CITY_RESET`, () => {
    const state = {
      activeCity: `Paris`,
      offers: [],
      isOffersLoaded: false,
      isError: false,
      errorCode: null
    };
    const resetCityAction = {
      type: ActionType.CITY_RESET,
      payload: null
    };

    expect(offers({
      offers: [], isOffersLoaded: false, activeCity: `Berlin`, isError: false, errorCode: null
    }, resetCityAction)).toEqual(state);

    expect(offers({
      offers: [], isOffersLoaded: false, activeCity: `Paris`, isError: false, errorCode: null
    }, resetCityAction)).toEqual(state);

    expect(offers({
      offers: [], isOffersLoaded: false, activeCity: ``, isError: false, errorCode: null
    }, resetCityAction)).toEqual(state);
  });

  it(`Reducer should set error status to given value`, () => {
    const offersList = [
      {
        id: 1,
        isFavorite: false,
      },
      {
        id: 2,
        isFavorite: false,
      },
      {
        id: 3,
        isFavorite: false,
      }
    ];

    const place = {
      id: 1,
      isFavorite: true,
    };

    const state = {
      activeCity: `Paris`,
      offers: offersList,
      isOffersLoaded: false,
      isError: false,
      errorCode: null
    };

    const changeFavoriteStatusAction = {
      type: ActionType.CHANGE_FAVORITE_STATUS,
      payload: place
    };

    expect(offers(state, changeFavoriteStatusAction))
      .toEqual({
        offers: [
          {
            id: 1,
            isFavorite: true,
          },
          {
            id: 2,
            isFavorite: false,
          },
          {
            id: 3,
            isFavorite: false,
          }
        ],
        activeCity: `Paris`,
        isOffersLoaded: false,
        isError: false,
        errorCode: null
      });
  });

  it(`Reducer should set error status to given value`, () => {
    const state = {
      activeCity: `Paris`,
      offers: [],
      isOffersLoaded: false,
      isError: false,
      errorCode: null
    };

    const changeErrorStatusAction = {
      type: ActionType.CHANGE_ERROR_STATUS,
      payload: {isError: true, code: 444}
    };

    expect(offers(state, changeErrorStatusAction))
      .toEqual({
        activeCity: `Paris`,
        offers: [],
        isOffersLoaded: false,
        isError: true,
        errorCode: 444
      });
  });
});

describe(`Async operation 'fetchOffersList' works correctly`, () => {
  it(`Should make a correct API call (GET) to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadOffers = fetchOffersList();

    apiMock
      .onGet(APIRoute.HOTELS)
      .reply(200, [
        {
          'bedrooms': 4,
          'city': {'name': `Cologne`, 'location': {}},
          'description': ``,
          'goods': [`Towels`],
          'host': {'id': 25, 'name': `Laura`, 'is_pro': true, 'avatar_url': `img/avatar-angelina.jpg`},
          'id': 8,
          'images': [`https://assets.htmlacademy.ru/intensives/javascript-3/hotel/17.jpg`],
          'is_favorite': false,
          'is_premium': false,
          'location': {},
          'max_adults': 4,
          'preview_image': `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/9.jpg`,
          'price': 983,
          'rating': 3.1,
          'title': ``,
          'type': ``,
        },
        {
          'bedrooms': 8,
          'city': {'name': `Copenhagen`, 'location': {}},
          'description': ``,
          'goods': [`Wi-fi`],
          'host': {'id': 35, 'name': `Mark`, 'is_pro': false, 'avatar_url': `img/avatar-angelina.jpg`},
          'id': 9,
          'images': [`https://assets.htmlacademy.ru/intensives/javascript-3/hotel/17.jpg`],
          'is_favorite': true,
          'is_premium': false,
          'location': {},
          'max_adults': 10,
          'preview_image': `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/9.jpg`,
          'price': 352,
          'rating': 4.1,
          'title': ``,
          'type': ``,
        }
      ]);

    return loadOffers(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [
            {
              bedrooms: 4,
              city: {name: `Cologne`, location: {}},
              description: ``,
              goods: [`Towels`],
              host: {id: 25, name: `Laura`, isPro: true, avatarUrl: `img/avatar-angelina.jpg`},
              id: 8,
              images: [`https://assets.htmlacademy.ru/intensives/javascript-3/hotel/17.jpg`],
              isFavorite: false,
              isPremium: false,
              location: {},
              maxAdults: 4,
              previewImage: `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/9.jpg`,
              price: 983,
              rating: 3.1,
              title: ``,
              type: ``,
            },
            {
              bedrooms: 8,
              city: {name: `Copenhagen`, location: {}},
              description: ``,
              goods: [`Wi-fi`],
              host: {id: 35, name: `Mark`, isPro: false, avatarUrl: `img/avatar-angelina.jpg`},
              id: 9,
              images: [`https://assets.htmlacademy.ru/intensives/javascript-3/hotel/17.jpg`],
              isFavorite: true,
              isPremium: false,
              location: {},
              maxAdults: 10,
              previewImage: `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/9.jpg`,
              price: 352,
              rating: 4.1,
              title: ``,
              type: ``,
            },
          ]
        });
      });
  });

});

describe(`Async operation 'addToFavorite' works correctly`, () => {
  it(`Should make a correct API call (POST) to /favorite/:hotel_id/:status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeId = 42;
    const status = 1;
    const saveToFavorite = addToFavorite(fakeId, status);

    apiMock
      .onPost(`${APIRoute.FAVORITE}/${fakeId}/${status}`)
      .reply(200, {
        'bedrooms': 1,
        'city': {'name': `Paris`, 'location': {}},
        'description': ``,
        'goods': [`Breakfast`],
        'host': {'id': 25, 'name': `Jorun`, 'is_pro': true, 'avatar_url': `img/avatar-angelina.jpg`},
        'id': 1,
        'images': [``],
        'is_favorite': true,
        'is_premium': true,
        'location': {},
        'max_adults': 1,
        'preview_image': ``,
        'price': 169,
        'rating': 3,
        'title': ``,
        'type': ``,
      });

    return saveToFavorite(dispatch, () => {}, api)
      .then((data) => {
        expect(data).toEqual({
          bedrooms: 1,
          city: {name: `Paris`, location: {}},
          description: ``,
          goods: [`Breakfast`],
          host: {id: 25, name: `Jorun`, isPro: true, avatarUrl: `img/avatar-angelina.jpg`},
          id: 1,
          images: [``],
          isFavorite: true,
          isPremium: true,
          location: {},
          maxAdults: 1,
          previewImage: ``,
          price: 169,
          rating: 3,
          title: ``,
          type: ``,
        });
      });
  });
});
