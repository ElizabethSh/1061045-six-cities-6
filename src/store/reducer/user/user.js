import {ActionType} from "../../action-type";

const initialState = {
  isAuthChecked: false,
  usersEmail: null,
  isLoggedIn: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTH:
      return ({
        ...state,
        isLoggedIn: action.payload
      });

    case ActionType.SET_USERS_EMAIL:
      return ({
        ...state,
        usersEmail: action.payload
      });

    case ActionType.CHECK_AUTH:
      return ({
        ...state,
        isAuthChecked: true
      });

    default:
      return state;
  }
};

export {user};
