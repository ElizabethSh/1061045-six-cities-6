import React from 'react';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Route, Router} from 'react-router';
import {Provider} from 'react-redux';
import PrivateRoute from './private-route';

const mockStore = configureStore({});
let history;

describe(`Test PrivateRoute`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/private`);
  });

  it(`Should render component for the public route, if user is not authorized`, () => {
    const store = mockStore({
      USER: {isLoggedIn: false}
    });

    render(
        <Provider store={store}>
          <Router history={history}>
            <Route exact path='/login'>
              <h1>Public Route</h1>
            </Route>
            <PrivateRoute
              exact
              path='/private'
              render={() => (<h1>Private Route</h1>)}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it(`Should render component for the private route, if user is authorized`, () => {
    const store = mockStore({
      USER: {isLoggedIn: true}
    });

    render(
        <Provider store={store}>
          <Router history={history}>
            <Route exact path='/login'>
              <h1>Public Route</h1>
            </Route>
            <PrivateRoute
              exact
              path='/private'
              render={() => (<h1>Private Route</h1>)}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});

