import React from 'react';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import Sort from './sort';
import {SortType} from '../../common/const';
import {Provider} from 'react-redux';

const mockStore = configureStore({});

describe(`Test 'Sort'`, () => {
  it(`Sort should render correctly`, () => {
    const store = mockStore({
      SORT: {sortType: SortType.POPULAR}
    });

    const {container} = render(
        <Provider store={store}>
          <Sort />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
