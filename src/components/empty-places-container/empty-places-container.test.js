import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import EmptyPlacesContainer from './empty-places-container';

const mockStore = configureStore({});

it(`EmptyPlacesContainer should render correctly`, () => {
  const store = mockStore({
    OFFER: {activeCity: `Amsterdam`}
  });

  const {container} = render(
      <Provider store={store}>
        <EmptyPlacesContainer />
      </Provider>
  );

  expect(container).toMatchSnapshot();
});
