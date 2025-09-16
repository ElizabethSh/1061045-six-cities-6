import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AuthPage from "./auth-page";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

const mockStore = configureStore({});

describe(`Test 'AuthPage'`, () => {
  it(`should render login form and allow typing`, () => {
    const store = mockStore({
      USER: { isLoggedIn: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      </Provider>
    );

    // Check form fields are present
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();

    // Simulate user typing
    userEvent.type(screen.getByTestId("email"), "user");
    userEvent.type(screen.getByTestId("password"), "123321");

    expect(screen.getByDisplayValue("user")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123321")).toBeInTheDocument();
  });
});
