import {ActionType} from "../../action-type";

export const loadReviews = (reviews) => {
  return {
    type: ActionType.LOAD_REVIEWS,
    payload: reviews
  };
};

export const resetReviews = () => {
  return {
    type: ActionType.RESET_REVIEWS
  };
};
