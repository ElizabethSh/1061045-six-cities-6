import {ActionType} from "../../action-type";

const initialState = {
  placeReviews: [],
  isReviewsLoaded: false,
};

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return ({
        ...state,
        placeReviews: action.payload,
        isReviewsLoaded: true
      });

    case ActionType.RESET_REVIEWS:
      return ({
        ...state,
        placeReviews: [],
        isReviewsLoaded: false
      });

    default:
      return state;
  }
};

export {reviews};
