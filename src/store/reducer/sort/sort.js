import {SortType} from "../../../common/const";
import {ActionType} from "../../action-type";

const initialState = {
  sortType: SortType.POPULAR,
};

const sort = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_SORT_TYPE:
      return ({
        ...state,
        sortType: action.payload
      });

    default:
      return state;
  }
};

export {sort};
