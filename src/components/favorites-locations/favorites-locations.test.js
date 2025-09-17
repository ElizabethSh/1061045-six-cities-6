import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import FavoritesLocations from "./favorites-locations";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router";

const mockStore = configureStore({});

describe(`Test 'FavoritesLocations'`, () => {
  it(`FavoritesLocations should render city and place info`, () => {
    const places = [
      {
        title: `The house among olive`,
        price: 169,
        previewImage: ``,
        type: `hotel`,
        isFavorite: true,
        isPremium: true,
        rating: 5,
        id: "15",
        bedrooms: 2,
        description: ``,
        maxAdults: 2,
        location: {},
        images: [``],
        host: {
          id: "25",
          name: `Maria`,
          isPro: true,
          avatarUrl: `img/avatar-angelina.jpg`,
        },
        goods: [`Breakfast`],
        city: { name: `Amsterdam`, location: {} },
      },
    ];

    const store = mockStore({
      PLACE_INFO: { placeInfo: {} },
      USER: { isLoggedIn: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesLocations city={`Amsterdam`} places={places} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Amsterdam")).toBeInTheDocument();
    expect(screen.getByText("The house among olive")).toBeInTheDocument();
    expect(screen.getByText(/hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/€169/i)).toBeInTheDocument();
  });
});
