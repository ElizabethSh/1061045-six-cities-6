import {SortType} from "../../../common/const";
import {ActionType} from "../../action-type";

const initialState = {
  sortType: SortType.POPULAR,
  sortedPlaces: [],
};

const sort = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_SORT_TYPE:
      return ({
        ...state,
        sortType: action.payload
      });

    case ActionType.SORT_PLACES_LIST:
      return ({
        ...state,
        sortedPlaces: action.payload
      });

    default:
      return state;
  }
};

export {sort};
