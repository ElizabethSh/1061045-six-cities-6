import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import AuthPage from './auth-page';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {Router} from 'react-router';

const mockStore = configureStore({});

describe(`Test 'AuthPage'`, () => {
  it(`AuthPage should render correctly`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {isLoggedIn: false}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <AuthPage />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();

    userEvent.type(screen.getByTestId(`email`), `user`);
    userEvent.type(screen.getByTestId(`password`), `123321`);

    expect(screen.getByDisplayValue(/user/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123321/i)).toBeInTheDocument();
  });

});

