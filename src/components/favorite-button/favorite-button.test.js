import React from 'react';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import FavoriteButton from './favorite-button';
import {ButtonName} from '../../common/const';

const mockStore = configureStore({});

describe(`Test 'FavoriteButton'`, () => {
  it(`FavoriteButton in the Place component should render correctly`, () => {
    const store = mockStore({
      PLACE_INFO: {placeInfo: {}},
      USER: {isLoggedIn: true}
    });

    const {container} = render(
        <Provider store={store}>
          <FavoriteButton
            isFavorite={true}
            buttonName={ButtonName.PROPERTY}
            placeId={99}
          />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`FavoriteButton in the PlaceCard component should render correctly`, () => {
    const store = mockStore({
      PLACE_INFO: {placeInfo: {}},
      USER: {isLoggedIn: true}
    });

    const {container} = render(
        <Provider store={store}>
          <FavoriteButton
            isFavorite={false}
            buttonName={ButtonName.PLACE_CARD}
            placeId={42}
          />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
