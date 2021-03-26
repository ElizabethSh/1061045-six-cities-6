import {ActionType} from "../../action-type";

export const setAuthStatus = (status) => {
  return {
    type: ActionType.REQUIRED_AUTH,
    payload: status
  };
};

export const checkAuthAttempt = () => {
  return {
    type: ActionType.CHECK_AUTH
  };
};

export const setUsersEmail = (email) => {
  return {
    type: ActionType.SET_USERS_EMAIL,
    payload: email
  };
};
