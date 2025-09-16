import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import MainPage from "./main-page";
import thunk from "redux-thunk";
import { createAPI } from "../../services/api";
import TestWrapper from "../../services/test-wrapper/test-wrapper";
import { MemoryRouter } from "react-router";

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);

describe(`Test 'MainPage'`, () => {
  it(`MainPage should render 'Loader' when data is loading`, () => {
    const store = mockStore({
      OFFER: { isOffersLoaded: false, offers: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it(`MainPage should render empty page if there are no offers`, () => {
    const store = mockStore({
      OFFER: { isOffersLoaded: true, offers: [] },
      USER: { isLoggedIn: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
  });

  it(`MainPage should render correctly with offers`, () => {
    render(
      <TestWrapper>
        <MainPage />
      </TestWrapper>
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Cities/i })
    ).toBeInTheDocument();
    expect(screen.getByText("1 place to stay in Paris")).toBeInTheDocument();
    expect(screen.getAllByRole("article").length).toBe(1);
  });
});
