import {ActionType} from "../../action-type";

export const setSortType = (sortType) => ({
  type: ActionType.CHANGE_SORT_TYPE,
  payload: sortType
});
