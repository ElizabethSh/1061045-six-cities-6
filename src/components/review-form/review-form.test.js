import React from 'react';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import ReviewForm from './review-form';

const mockStore = configureStore({});

describe(`Test 'ReviewForm'`, () => {
  it(`ReviewForm should render correctly`, () => {
    const store = mockStore({
      REVIEW: {placeReviews: []}
    });

    const {container} = render(
        <Provider store={store}>
          <ReviewForm
            placeId={`42`}
          />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
