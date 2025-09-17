import { ActionType } from "../../action-type";

export const loadReviews = (reviews) => {
  return {
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  };
};

export const addReview = (review) => {
  return {
    type: ActionType.ADD_REVIEW,
    payload: review,
  };
};

export const resetReviews = () => {
  return {
    type: ActionType.RESET_REVIEWS,
  };
};
