import React from 'react';
import {render} from "@testing-library/react";
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Popup from './popup';

const mockStore = configureStore({});

it(`Popup should render correctly`, () => {
  const {container} = render(
      <Provider store={mockStore({})}>
        <Popup />
      </Provider>
  );

  expect(container).toMatchSnapshot();
});
