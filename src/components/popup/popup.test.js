import React from 'react';
import {render} from "@testing-library/react";
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Popup from './popup';

const mockStore = configureStore({});

describe(`Popup should render correctly`, () => {
  it(`Popup should show 'Data loading error' message`, () => {
    const store = mockStore({
      OFFER: {errorCode: null}
    });

    const {container} = render(
        <Provider store={store}>
          <Popup />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`Popup should show 'Wrong email or password' message`, () => {
    const store = mockStore({
      OFFER: {errorCode: 400}
    });

    const {container} = render(
        <Provider store={store}>
          <Popup />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});


