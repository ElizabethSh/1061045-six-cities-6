import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from "react-redux";
import {createMemoryHistory} from 'history';
import FavoritesLocations from "./favorites-locations";
import configureStore from 'redux-mock-store';
import {Router} from 'react-router';

const mockStore = configureStore({});

describe(`Test 'FavoritesLocations'`, () => {
  it(`FavoritesLocations should render correctly`, () => {
    const places = [
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
      }
    ];

    const history = createMemoryHistory();
    const store = mockStore({
      PLACE_INFO: {placeInfo: {}},
      USER: {isLoggedIn: true}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <FavoritesLocations
              city={`Amsterdam`}
              places={places}
            />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
