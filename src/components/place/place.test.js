import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { createAPI } from "../../services/api";
import Place from "./place";
import TestWrapper from "../../services/test-wrapper/test-wrapper";

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);

describe(`Test 'Place'`, () => {
  it(`Place should render Loader if data is loading`, () => {
    const store = mockStore({
      PLACE_INFO: { isPlaceInfoLoaded: false },
      NEAR_PLACE: { isNearPlacesLoaded: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/offer/11"]}>
          <Place />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it(`Place should render correctly`, () => {
    render(
      <TestWrapper url="/offer/11">
        <Place />
      </TestWrapper>
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews /i)).toBeInTheDocument();
    expect(
      screen.getByText(/Other places in the neighbourhood/i)
    ).toBeInTheDocument();
  });
});
