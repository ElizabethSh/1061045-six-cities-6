import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import CityList from "./city-list";

const mockStore = configureStore({});
const cities = ["London", "Paris", "Berlin", "Odence", "Venice", "Copenhagen"];

describe("CityList", () => {
  it("renders all cities passed as props", () => {
    const store = mockStore({
      OFFER: { activeCity: "Copenhagen" },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CityList cities={cities} />
        </MemoryRouter>
      </Provider>
    );
    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it("highlights the active city", () => {
    const store = mockStore({
      OFFER: { activeCity: "Paris" },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CityList cities={cities} />
        </MemoryRouter>
      </Provider>
    );
    const activeCity = screen.getByText("Paris");
    expect(activeCity).toHaveClass("tabs__item--active");
  });

  it("handles an empty cities array", () => {
    const store = mockStore({
      OFFER: { activeCity: "Paris" },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CityList cities={[]} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryAllByRole("listitem").length).toBe(0);
  });
});
