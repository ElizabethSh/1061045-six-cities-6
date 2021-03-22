import {ActionType} from "../../action-type";

export const loadNearPlaces = (data) => {
  return {
    type: ActionType.LOAD_NEAR_PLACES,
    payload: data
  };
};

export const resetNearPlaces = () => {
  return {
    type: ActionType.RESET_NEAR_PLACES
  };
};
