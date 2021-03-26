import {ActionType} from "../../action-type";
import {checkAuthAttempt, setAuthStatus, setUsersEmail} from "./action";

describe(`Action creators work correctly`, () => {
  it(`Action creator for setting auth status returns action with given auth status`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTH,
      payload: true
    };

    expect(setAuthStatus(true))
      .toEqual(expectedAction);
  });

  it(`Action creator for checking auth attempt return action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.CHECK_AUTH
    };

    expect(checkAuthAttempt())
      .toEqual(expectedAction);
  });

  it(`Action creator for setting users email returns action with given email`, () => {
    const expectedAction = {
      type: ActionType.SET_USERS_EMAIL,
      payload: `test@academy.ru`
    };

    expect(setUsersEmail(`test@academy.ru`))
      .toEqual(expectedAction);
  });
});
