import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FavoritesContainer from "./favorites-container";
import { MemoryRouter } from "react-router";

const mockStore = configureStore({});

describe("FavoritesContainer", () => {
  it("should render favorite places grouped by city", () => {
    const store = mockStore({
      PLACE_INFO: { placeInfo: {} },
      USER: { isLoggedIn: true },
      FAVORITE: {
        favorites: [
          {
            title: "The house among olive",
            price: 169,
            previewImage: "",
            type: "hotel",
            isFavorite: true,
            isPremium: true,
            rating: 5,
            id: 15,
            bedrooms: 2,
            description: "",
            maxAdults: 2,
            location: {
              latitude: 52.3909553943508,
              longitude: 4.85309666406198,
              zoom: 8,
            },
            images: [""],
            host: {
              id: 25,
              name: "Maria",
              isPro: true,
              avatarUrl: "img/avatar-angelina.jpg",
            },
            goods: ["Breakfast"],
            city: {
              name: "Amsterdam",
              location: { latitude: 52.37454, longitude: 4.897976, zoom: 10 },
            },
          },
          {
            title: "The good place",
            price: 269,
            previewImage: "",
            type: "hostel",
            isFavorite: true,
            isPremium: true,
            rating: 5,
            id: 25,
            bedrooms: 2,
            description: "",
            maxAdults: 2,
            location: { latitude: 50.938361, longitude: 6.959974, zoom: 8 },
            images: [""],
            host: {
              id: 25,
              name: "Maria",
              isPro: true,
              avatarUrl: "img/avatar-angelina.jpg",
            },
            goods: ["Breakfast"],
            city: {
              name: "Cologne",
              location: { latitude: 50.938361, longitude: 6.959974, zoom: 10 },
            },
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesContainer />
        </MemoryRouter>
      </Provider>
    );
    // Check for city names
    expect(screen.getByText("Amsterdam")).toBeInTheDocument();
    expect(screen.getByText("Cologne")).toBeInTheDocument();
    // Check for favorite place titles
    expect(screen.getByText("The house among olive")).toBeInTheDocument();
    expect(screen.getByText("The good place")).toBeInTheDocument();
    // Check for price
    expect(screen.getByText(/€169/i)).toBeInTheDocument();
    expect(screen.getByText(/€269/i)).toBeInTheDocument();
    // Check for type
    expect(screen.getByText(/hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/hostel/i)).toBeInTheDocument();
  });

  it("should show empty list if no favorites", () => {
    const store = mockStore({
      PLACE_INFO: { placeInfo: {} },
      USER: { isLoggedIn: true },
      FAVORITE: { favorites: [] },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesContainer />
        </MemoryRouter>
      </Provider>
    );
    // Should show the section title
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    // Should not render any city or place
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
