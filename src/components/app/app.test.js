import React from 'react';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router';
import {AppRoute} from '../../common/const';
import App from './app';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);
let history;

describe(`Test routing`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`Render 'Loader' during auth checking`, () => {
    const store = mockStore({
      OFFER: {isError: false},
      USER: {isAuthChecked: false}
    });

    history.push(AppRoute.LOGIN);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Loading...`)).toBeInTheDocument();
  });

  it(`Render 'Popup' if there is a data loading error`, () => {
    const store = mockStore({
      OFFER: {isError: true},
      USER: {isAuthChecked: true}
    });

    history.push(AppRoute.LOGIN);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Data loading error`)).toBeInTheDocument();
  });

  it(`Render 'AuthPage' when user navigate to '/login' url`, () => {
    const store = mockStore({
      OFFER: {isError: false},
      USER: {isAuthChecked: true}
    });

    history.push(AppRoute.LOGIN);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByAltText(`6 cities logo`)).toBeInTheDocument();
    expect(screen.getByTestId(`email`)).toBeInTheDocument();
    expect(screen.getByTestId(`password`)).toBeInTheDocument();
    expect(screen.getByRole(`button`, {name: /sign in/i})).toBeInTheDocument();
  });

  it(`Render 'NotFoundPage' when user navigate to non-existent route`, () => {
    const store = mockStore({
      OFFER: {isError: false},
      USER: {isAuthChecked: true}
    });

    history.push(`/non-existent-route`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`404: Page is not found`)).toBeInTheDocument();
    expect(screen.getByText(`Go back to the main page`)).toBeInTheDocument();
  });
});
