import {ActionType} from "../../action-type";
import {SortType} from "../../../common/const";
import {setSortType} from "./action";

describe(`Action creator works correctly`, () => {
  it(`Action creator for changing sort type returns action with given sort type`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.PRICE_HIGHT_TO_LOW
    };

    expect(setSortType(SortType.PRICE_HIGHT_TO_LOW))
      .toEqual(expectedAction);
  });
});
