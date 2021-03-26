import {ActionType} from "../../action-type";

export const loadPlaceInfo = (data) => {
  return {
    type: ActionType.LOAD_PLACE_INFO,
    payload: data
  };
};

export const resetPlaceInfo = () => {
  return {
    type: ActionType.RESET_PLACE_INFO
  };
};
