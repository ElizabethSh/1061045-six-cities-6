import React from 'react';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import PlaceReview from './place-review';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);

describe(`Test 'PlaceReview'`, () => {
  it(`PlaceReview should render empty review list if reviews are missing`, () => {
    const store = mockStore({
      REVIEW: {isReviewsLoaded: true, placeReviews: []},
      USER: {isLoggedIn: true}
    });

    const {container} = render(
        <Provider store={store}>
          <PlaceReview
            placeId={`24`}
          />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`PlaceReview should render 'Loader' if data is loading`, () => {
    const store = mockStore({
      REVIEW: {isReviewsLoaded: false},
      USER: {isLoggedIn: true}
    });

    const {container} = render(
        <Provider store={store}>
          <PlaceReview
            placeId={`44`}
          />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`PlaceReview should render correctly`, () => {
    const store = mockStore({
      USER: {isLoggedIn: true},
      REVIEW: {
        isReviewsLoaded: true,
        placeReviews: [
          {
            comment: ``,
            date: `2020-04-23T08:04:28.647Z`,
            id: 2,
            rating: 4,
            user: {
              avatarUrl: ``,
              id: 8,
              isPro: true,
              name: `Aretha`,
            }
          }
        ]
      }
    });

    const {container} = render(
        <Provider store={store}>
          <PlaceReview placeId={`53`}/>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
