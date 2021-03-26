import React from 'react';
import {render} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import NotFoundPage from './not-found-page';

const mockStore = configureStore({});
let history;

describe(`Test NotFoundPage`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`NotFoundPage should render correctly, when user is logged in`, () => {
    const store = mockStore({
      USER: {isLoggedIn: true, usersEmail: `test@gmail.com`}
    });
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <NotFoundPage />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`NotFoundPage should render correctly, when user is not logged in`, () => {
    const store = mockStore({
      USER: {isLoggedIn: false, usersEmail: null}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <NotFoundPage />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

