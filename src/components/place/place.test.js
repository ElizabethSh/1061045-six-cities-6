import React from 'react';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from "history";
import {Provider} from 'react-redux';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import Place from './place';
import {Route, Router} from 'react-router';
import TestWrapper from '../../services/test-wrapper/test-wrapper';

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

  it(`Place should render correctly`, () => {

    const {container} = render(
        <TestWrapper url={`/offer/11`}>
          <Route
            path={`/offer/:id`}
            exact
            render={() => <Place/>}
          />
        </TestWrapper>
    );

    expect(container).toMatchSnapshot();
  });
});
