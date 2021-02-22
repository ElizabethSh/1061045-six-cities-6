import {ActionType} from "./actionType";

export const ActionCreator = {
  cityChangeAction: (activeCity) => ({
    type: ActionType.CITY_CHANGE,
    payload: activeCity,
  }),

  cityResetAction: () => ({
    type: ActionType.CITY_RESET,
  }),
};
