import {SortType} from "../../../common/const";
import {ActionType} from "../../action-type";
import {sort} from "./sort";

describe(`Reducer 'sort' works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const state = {
      sortType: SortType.POPULAR,
    };

    expect(sort(undefined, {}))
      .toEqual(state);
  });

  it(`Reducer should set sort type to given value`, () => {
    const state = {
      sortType: SortType.POPULAR,
    };

    const changeSortTypeAction = {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.TOP_RATED
    };

    expect(sort(state, changeSortTypeAction))
      .toEqual({sortType: SortType.TOP_RATED});
  });
});
