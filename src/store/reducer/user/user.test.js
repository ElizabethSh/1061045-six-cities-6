import MockAdapter from 'axios-mock-adapter';
import {user} from "./user";
import {createAPI} from "../../../services/api";
import {ActionType} from "../../action-type";
import {APIRoute} from '../../../common/const';
import {checkAuth, logIn, logOut} from '../../api-actions';

const api = createAPI(() => {});

describe(`Reducer 'user' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const state = {isAuthChecked: false, usersEmail: null, isLoggedIn: false};

    expect(user(undefined, {})).toEqual(state);
  });

  it(`Reducer should update isLoggedIn to 'true'`, () => {
    const state = {isAuthChecked: false, usersEmail: null, isLoggedIn: false};

    const setAuthStatusAction = {
      type: ActionType.REQUIRED_AUTH,
      payload: true
    };

    expect(user(state, setAuthStatusAction))
      .toEqual({isAuthChecked: false, usersEmail: null, isLoggedIn: true});
  });

  it(`Reducer should update users email to given value`, () => {
    const state = {isAuthChecked: false, usersEmail: null, isLoggedIn: false};

    const setUsersEmailAction = {
      type: ActionType.SET_USERS_EMAIL,
      payload: `test@test.com`
    };

    expect(user(state, setUsersEmailAction))
      .toEqual({isAuthChecked: false, usersEmail: `test@test.com`, isLoggedIn: false});
  });


  it(`Reducer should update isAuthChecked to 'true'`, () => {
    const state = {isAuthChecked: false, usersEmail: null, isLoggedIn: false};

    const checkAuthAction = {
      type: ActionType.CHECK_AUTH,
      payload: null
    };

    expect(user(state, checkAuthAction))
      .toEqual({isAuthChecked: true, usersEmail: null, isLoggedIn: false});
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call (GET) to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, {"email": `test@gmail.com`});

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USERS_EMAIL,
          payload: `test@gmail.com`
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTH,
          payload: true
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHECK_AUTH
        });
      });
  });

  it(`Should make a correct API call (POST) to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `test@gmail.com`, password: `123321`};
    const logInLoader = logIn(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return logInLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTH,
          payload: true
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USERS_EMAIL,
          payload: `test@gmail.com`
        });
      });
  });

  it(`Should make a correct API call (GET) to /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logOutLoader = logOut();

    apiMock
      .onGet(APIRoute.LOGOUT)
      .reply(200, [{fake: true}]);

    return logOutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTH,
          payload: false
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USERS_EMAIL,
          payload: null
        });
      });
  });
});
