import React from 'react';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Map from './map';

const mockStore = configureStore({});

describe(`Test 'Map'`, () => {
  it(`Map should render correctly`, () => {
    const places = [{
      title: `Nice, cozy, warm big bed apartment`,
      price: 129,
      previewImage: ``,
      type: `room`,
      isFavorite: false,
      isPremium: false,
      rating: 3,
      id: 11,
      bedrooms: 1,
      description: ``,
      maxAdults: 1,
      location: {latitude: 52.36354, longitude: 4.911976, zoom: 16},
      images: [``],
      host: {id: 25, name: `Angelina`, isPro: false, avatarUrl: `img/avatar-angelina.jpg`},
      goods: [`Washer`],
      city: {name: `Amsterdam`, location: {latitude: 52.37454, longitude: 4.897976, zoom: 13}},
    }];

    const store = mockStore({
      CARD: {activeCard: 3}
    });

    const {container} = render(
        <Provider store={store}>
          <Map
            places={places}
            city={`Amsterdam`}
            placeInfo={places[0]}
          />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
