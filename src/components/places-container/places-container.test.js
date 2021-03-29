import React from 'react';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import PlacesContainer from './places-container';
import {SortType} from '../../common/const';
import {Router} from 'react-router';

const mockStore = configureStore({});

describe(`Test 'PlacesContainer'`, () => {
  it(`PlacesContainer should render correctly`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      SORT: {sortType: SortType.PRICE_HIGHT_TO_LOW},
      CARD: {activeCard: 15},
      PLACE_INFO: {placeInfo: {}},
      USER: {isLoggedIn: true},
      OFFER: {
        activeCity: `Paris`,
        offers: [
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
            location: {latitude: 48.83861, longitude: 2.350499, zoom: 16},
            images: [``],
            host: {id: 25, name: `Maria`, isPro: true, avatarUrl: ``},
            goods: [`Breakfast`],
            city: {name: `Paris`, location: {latitude: 48.85661, longitude: 2.351499, zoom: 13}},
          },
          {
            title: `The house among olive`,
            price: 169,
            previewImage: ``,
            type: `hostel`,
            isFavorite: false,
            isPremium: false,
            rating: 5,
            id: 19,
            bedrooms: 2,
            description: ``,
            maxAdults: 2,
            location: {latitude: 48.837610000000005, longitude: 2.3454990000000002, zoom: 16},
            images: [``],
            host: {id: 25, name: `Helga`, isPro: true, avatarUrl: ``},
            goods: [`Wi-Fi`],
            city: {name: `Paris`, location: {latitude: 48.85661, longitude: 2.351499, zoom: 13}},
          }
        ]
      }
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <PlacesContainer/>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
