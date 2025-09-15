import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import PageHeader from "./page-header";

const mockStore = configureStore({});

describe(`PageHeader component`, () => {
  it(`should render logo image`, () => {
    const store = mockStore({ USER: { isLoggedIn: false, usersEmail: null } });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PageHeader />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByAltText("6 cities logo")).toBeVisible();
  });

  it(`should show user email and sign out when logged in`, () => {
    const store = mockStore({
      USER: { isLoggedIn: true, usersEmail: "test@gmail.com" },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PageHeader />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/test@gmail.com/i)).toBeVisible();
    expect(
      screen.getByRole("button", { name: /log out/i })
    ).toBeInTheDocument();
  });

  it(`should show sign in when not logged in`, () => {
    const store = mockStore({ USER: { isLoggedIn: false, usersEmail: null } });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PageHeader />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole("link", { name: /sign in/i })).toBeVisible();
  });

  it(`should navigate to login when sign in is clicked`, () => {
    const store = mockStore({ USER: { isLoggedIn: false, usersEmail: null } });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PageHeader />
        </MemoryRouter>
      </Provider>
    );
    const signInLink = screen.getByRole("link", { name: /sign in/i });
    expect(signInLink).toBeVisible();
    expect(signInLink).toHaveAttribute("href", "/login");
  });

  it(`should call sign out action when sign out is clicked`, () => {
    const store = mockStore({
      USER: { isLoggedIn: true, usersEmail: "test@gmail.com" },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PageHeader />
        </MemoryRouter>
      </Provider>
    );
    const signOutLink = screen.getByRole("button", { name: /log out/i });
    expect(signOutLink).toBeVisible();
    expect(signOutLink).toHaveAttribute("type", "button");
  });
});
