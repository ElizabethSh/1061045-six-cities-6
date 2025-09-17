import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AppRoute } from "../../common/const";
import App from "./app";
import { Provider } from "react-redux";
import TestWrapper from "../../services/test-wrapper/test-wrapper";
import { mockStore } from "../../test-utils/mock-store";

describe(`Test routing`, () => {
  it(`Render 'Loader' during auth checking`, () => {
    const store = mockStore({
      OFFER: { isError: false },
      USER: { isAuthChecked: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.LOGIN]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(`Loading...`)).toBeInTheDocument();
  });

  it(`Render 'Popup' if there is a data loading error`, () => {
    const store = mockStore({
      OFFER: { isError: true },
      USER: { isAuthChecked: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.LOGIN]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(`Data loading error`)).toBeInTheDocument();
  });

  it(`Render 'MainPage' when user navigate to '/' URL`, () => {
    render(
      <TestWrapper url={AppRoute.ROOT}>
        <App />
      </TestWrapper>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByAltText(`6 cities logo`)).toBeInTheDocument();
  });

  it(`Render 'Place' when user navigate to '/offer/:id' URL`, () => {
    render(
      <TestWrapper url={`/offer/11`}>
        <App />
      </TestWrapper>
    );

    expect(screen.getByAltText(`6 cities logo`)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews /i)).toBeInTheDocument();
    expect(
      screen.getByText(/Other places in the neighbourhood/i)
    ).toBeInTheDocument();
  });

  it(`Render 'AuthPage' when user navigate to '/login' url`, () => {
    const store = mockStore({
      OFFER: { isError: false },
      USER: { isAuthChecked: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.LOGIN]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(`6 cities logo`)).toBeInTheDocument();
    expect(screen.getByTestId(`email`)).toBeInTheDocument();
    expect(screen.getByTestId(`password`)).toBeInTheDocument();
    expect(
      screen.getByRole(`button`, { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it(`Render 'NotFoundPage' when user navigate to non-existent route`, () => {
    const store = mockStore({
      OFFER: { isError: false },
      USER: { isAuthChecked: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/non-existent-route`]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(`404: Page is not found`)).toBeInTheDocument();
    expect(screen.getByText(`Go back to the main page`)).toBeInTheDocument();
  });
});
