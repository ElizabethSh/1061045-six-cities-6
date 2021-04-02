import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import ReviewForm from './review-form';
import userEvent from '@testing-library/user-event';

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

    userEvent.type(screen.getByRole(`textbox`), `The good place`);
    expect(screen.getByDisplayValue(/the good place/i)).toBeInTheDocument();
  });
});
