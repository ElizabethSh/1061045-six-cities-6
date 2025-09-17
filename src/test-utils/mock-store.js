import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createAPI } from "../services/api";

export const api = createAPI(() => {});
export const mockStore = (state) => {
  const configuredMockStore = configureMockStore([
    thunk.withExtraArgument(api),
  ]);
  return configuredMockStore(state);
};
