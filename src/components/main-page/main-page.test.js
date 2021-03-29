import React from 'react';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from "history";
import {Provider} from 'react-redux';
import MainPage from './main-page';
import {Router} from 'react-router';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);
let history;

describe(`Test 'MainPage'`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`MainPage should render 'Loader' when data is loading`, () => {
    const store = mockStore({
      OFFER: {isOffersLoaded: false, offers: []}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <MainPage/>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`MainPage should render empty page if there are no offers`, () => {
    const store = mockStore({
      OFFER: {isOffersLoaded: true, offers: []},
      USER: {isLoggedIn: false},
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <MainPage/>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
