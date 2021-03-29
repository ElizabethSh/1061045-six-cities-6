import MockAdapter from 'axios-mock-adapter';
import {APIRoute} from '../../../common/const';
import {createAPI} from '../../../services/api';
import {ActionType} from "../../action-type";
import {fetchFavoritePlaces} from '../../api-actions';
import {favorites} from "./favorites";

const api = createAPI(() => {});

describe(`Reducer 'favorites' works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(favorites(undefined, {}))
      .toEqual({favorites: [], isFavoritesLoaded: false});
  });

  it(`Reducer should update favorites by loaded data`, () => {
    const state = {favorites: [], isFavoritesLoaded: false};

    const loadFavoritesAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: [{}, {}]
    };

    expect(favorites(state, loadFavoritesAction))
      .toEqual({favorites: [{}, {}], isFavoritesLoaded: true});

    const notChangedFavoritesAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: []
    };

    expect(favorites(state, notChangedFavoritesAction))
      .toEqual({favorites: [], isFavoritesLoaded: true});
  });

  it(`Reducer should return default`, () => {
    const resetFavoritesAction = {
      type: ActionType.RESET_FAVORITES,
      payload: null
    };

    expect(favorites({favorites: [{}, {}], isFavoritesLoaded: true}, resetFavoritesAction))
      .toEqual({favorites: [], isFavoritesLoaded: false});

    expect(favorites({favorites: [], isFavoritesLoaded: true}, resetFavoritesAction))
      .toEqual({favorites: [], isFavoritesLoaded: false});

    expect(favorites({favorites: [], isFavoritesLoaded: false}, resetFavoritesAction))
      .toEqual({favorites: [], isFavoritesLoaded: false});
  });
});

describe(`Async operation works correctly`, () => {
  it(`Should make a correct API call (GET) to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadFavorites = fetchFavoritePlaces();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, [{
        'bedrooms': 1,
        'city': {name: `Brussels`, location: {}},
        'description': ``,
        'goods': [`Fridge`],
        'host': {'id': 25, 'name': `Angelina`, 'is_pro': true, 'avatar_url': `img/avatar-angelina.jpg`},
        'id': 21,
        'images': [``],
        'is_favorite': true,
        'is_premium': false,
        'location': {},
        'max_adults': 4,
        'preview_image': ``,
        'price': 620,
        'rating': 3.5,
        'title': ``,
        'type': ``,
      }]);

    return loadFavorites(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: [{
            bedrooms: 1,
            city: {name: `Brussels`, location: {}},
            description: ``,
            goods: [`Fridge`],
            host: {id: 25, name: `Angelina`, isPro: true, avatarUrl: `img/avatar-angelina.jpg`},
            id: 21,
            images: [``],
            isFavorite: true,
            isPremium: false,
            location: {},
            maxAdults: 4,
            previewImage: ``,
            price: 620,
            rating: 3.5,
            title: ``,
            type: ``,
          }]
        });
      });
  });
});
