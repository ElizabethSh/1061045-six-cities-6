import React from 'react';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from "history";
import {Provider} from 'react-redux';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import Place from './place';
import {Router} from 'react-router';

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);
let history;

describe(`Test 'Place'`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`Place should render Loader if data is loading`, () => {
    const store = mockStore({
      PLACE_INFO: {isPlaceInfoLoaded: false},
      NEAR_PLACE: {isNearPlacesLoaded: false}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Place/>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
