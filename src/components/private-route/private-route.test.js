import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Routes, Route, MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import PrivateRoute from "./private-route";

const mockStore = configureStore({});

describe(`Test PrivateRoute`, () => {
  it(`Should render component for the public route, if user is not authorized`, () => {
    const store = mockStore({
      USER: { isLoggedIn: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/private"]}>
          <Routes>
            <Route path="/login" element={<h1>Public Route</h1>} />
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it(`Should render component for the private route, if user is authorized`, () => {
    const store = mockStore({
      USER: { isLoggedIn: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/private"]}>
          <Routes>
            <Route path="/login" element={<h1>Public Route</h1>} />
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    // NOTE: login route is available only for not authorized users
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
