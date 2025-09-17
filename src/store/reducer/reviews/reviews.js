import { ActionType } from "../../action-type";

const initialState = {
  placeReviews: [],
  isReviewsLoaded: false,
};

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        placeReviews: action.payload,
        isReviewsLoaded: true,
      };
    case ActionType.ADD_REVIEW:
      return {
        ...state,
        placeReviews: [...state.placeReviews, action.payload],
      };

    case ActionType.RESET_REVIEWS:
      return {
        ...state,
        placeReviews: [],
        isReviewsLoaded: false,
      };

    default:
      return state;
  }
};

// Selectors
export const getPlaceReviews = (state) => state.REVIEW.placeReviews;
export const getIsReviewsLoaded = (state) => state.REVIEW.isReviewsLoaded;

export { reviews };
