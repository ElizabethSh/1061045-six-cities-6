import React from 'react';
import {render} from "@testing-library/react";
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import FavoritesContainer from './favorites-container';
import {Router} from 'react-router';

const mockStore = configureStore({});

it(`FavoritesContainer should render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    PLACE_INFO: {placeInfo: {}},
    USER: {isLoggedIn: true},
    FAVORITE: {favorites: [
      {
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
        city: {name: `Amsterdam`, location: {}},
      },
      {
        title: `The good place`,
        price: 269,
        previewImage: ``,
        type: `hostel`,
        isFavorite: true,
        isPremium: true,
        rating: 5,
        id: 25,
        bedrooms: 2,
        description: ``,
        maxAdults: 2,
        location: {},
        images: [``],
        host: {id: 25, name: `Maria`, isPro: true, avatarUrl: `img/avatar-angelina.jpg`},
        goods: [`Breakfast`],
        city: {name: `Cologne`, location: {}},
      },
    ]}
  });
  const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesContainer />
        </Router>
      </Provider>
  );

  expect(container).toMatchSnapshot();
});
