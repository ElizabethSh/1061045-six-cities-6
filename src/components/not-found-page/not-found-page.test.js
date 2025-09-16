import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "./not-found-page";

const mockStore = configureStore({});

describe(`NotFoundPage`, () => {
  it(`should render not found message`, () => {
    const store = mockStore({
      USER: { isLoggedIn: true },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByRole("heading", { name: "404: Page is not found" })
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /go back to the main page/i })
    ).toBeVisible();
  });
});
