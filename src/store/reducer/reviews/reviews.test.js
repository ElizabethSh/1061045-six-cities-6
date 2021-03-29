import MockAdapter from 'axios-mock-adapter';
import {APIRoute} from '../../../common/const';
import {createAPI} from '../../../services/api';
import {ActionType} from "../../action-type";
import {fetchPlaceReviews, sendPlaceReview} from '../../api-actions';
import {reviews} from "./reviews";

const api = createAPI(() => {});

describe(`Reducer 'reviews' works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reviews(undefined, {})).toEqual({placeReviews: [], isReviewsLoaded: false});
  });

  it(`Reducer should update reviews by loaded reviews`, () => {
    const state = {placeReviews: [], isReviewsLoaded: false};

    const loadReviewsAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: [{}, {}]
    };

    expect(reviews(state, loadReviewsAction))
      .toEqual({placeReviews: [{}, {}], isReviewsLoaded: true});

    const notChangedReviewsAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: []
    };

    expect(reviews(state, notChangedReviewsAction))
      .toEqual({placeReviews: [], isReviewsLoaded: true});
  });

  it(`Reducer should return default`, () => {
    const state = {placeReviews: [], isReviewsLoaded: false};

    const resetReviewsAction = {
      type: ActionType.RESET_REVIEWS,
      payload: null
    };

    expect(reviews({placeReviews: [{}, {}], isReviewsLoaded: false}, resetReviewsAction))
      .toEqual(state);

    expect(reviews({placeReviews: [], isReviewsLoaded: false}, resetReviewsAction))
      .toEqual(state);

    expect(reviews({placeReviews: [], isReviewsLoaded: true}, resetReviewsAction))
      .toEqual(state);

  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call (GET) to /comments/:hotel_id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeId = 99;
    const loadReviews = fetchPlaceReviews(fakeId);

    apiMock
      .onGet(`${APIRoute.COMMENTS}/${fakeId}`)
      .reply(200, [
        {
          'comment': ``,
          'date': `2021-01-23T08:04:28.647Z`,
          'id': 1,
          'rating': 5,
          'user': {
            'avatar_url': ``,
            'id': 18,
            'is_pro': true,
            'name': `Sophie`,
          }
        },
        {
          'comment': ``,
          'date': `2020-03-23T08:04:28.647Z`,
          'id': 3,
          'rating': 4,
          'user': {
            'avatar_url': ``,
            'id': 21,
            'is_pro': false,
            'name': `Jacob`,
          }
        }
      ]);

    return loadReviews(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [
            {
              comment: ``,
              date: `2021-01-23T08:04:28.647Z`,
              id: 1,
              rating: 5,
              user: {
                avatarUrl: ``,
                id: 18,
                isPro: true,
                name: `Sophie`,
              }
            },
            {
              comment: ``,
              date: `2020-03-23T08:04:28.647Z`,
              id: 3,
              rating: 4,
              user: {
                avatarUrl: ``,
                id: 21,
                isPro: false,
                name: `Jacob`,
              }
            }
          ]
        });
      });
  });

  it(`Should make a correct API call (POST) to /comments/:hotel_id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeId = 98;
    const fakeReview = {rating: 5, comment: ``};
    const sendReviews = sendPlaceReview(fakeId, fakeReview);

    apiMock
      .onPost(`${APIRoute.COMMENTS}/${fakeId}`)
      .reply(200, [
        {
          'comment': ``,
          'date': `2020-05-23T08:04:28.647Z`,
          'id': 1,
          'rating': 5,
          'user': {
            'avatar_url': ``,
            'id': 9,
            'is_pro': false,
            'name': `Jenny`,
          }
        },
        {
          'comment': ``,
          'date': `2019-07-23T08:04:28.647Z`,
          'id': 3,
          'rating': 4,
          'user': {
            'avatar_url': ``,
            'id': 14,
            'is_pro': false,
            'name': `Keks`,
          }
        }
      ]);

    return sendReviews(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [
            {
              comment: ``,
              date: `2020-05-23T08:04:28.647Z`,
              id: 1,
              rating: 5,
              user: {
                avatarUrl: ``,
                id: 9,
                isPro: false,
                name: `Jenny`,
              }
            },
            {
              comment: ``,
              date: `2019-07-23T08:04:28.647Z`,
              id: 3,
              rating: 4,
              user: {
                avatarUrl: ``,
                id: 14,
                isPro: false,
                name: `Keks`,
              }
            }
          ]
        });
      });
  });
});
