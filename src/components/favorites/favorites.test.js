import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import Favorites from './favorites';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);
let history;

describe(`Test 'Favorites'`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`Favorites should render empty page if favorites are missing`, () => {
    const store = mockStore({
      USER: {isLoggedIn: true},
      FAVORITE: {isFavoritesLoaded: true, favorites: []}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Favorites/>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`Favorites should render Loader if data is loading`, () => {
    const store = mockStore({
      FAVORITE: {isFavoritesLoaded: false}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Favorites/>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`Favorites should render correctly`, () => {
    const store = mockStore({
      PLACE_INFO: {placeInfo: {}},
      USER: {isLoggedIn: true},
      FAVORITE: {
        isFavoritesLoaded: true,
        favorites: [{
          title: `The house among olive`,
          price: 169,
          previewImage: ``,
          type: `hotel`,
          isFavorite: true,
          isPremium: true,
          rating: 5,
          id: 15,
          bedrooms: 2,
          description: ``,
          maxAdults: 2,
          location: {},
          images: [``],
          host: {id: 25, name: `Maria`, isPro: true, avatarUrl: `img/avatar-angelina.jpg`},
          goods: [`Breakfast`],
          city: {name: `Hamburg`, location: {}},
        }]
      }
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Favorites/>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
