import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PlaceCard from "./place-card";
import { CardName } from "../../common/const";
import { Provider } from "react-redux";
import { mockStore } from "../../test-utils/mock-store";

describe(`Test 'PlaceCard'`, () => {
  it(`should render all main info`, () => {
    const place = {
      title: `The house among olive`,
      price: 169,
      previewImage: `img/apartment-01.jpg`,
      type: `hotel`,
      isFavorite: true,
      isPremium: true,
      rating: 5,
      id: "15",
      bedrooms: 2,
      description: `Nice place`,
      maxAdults: 2,
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 8,
      },
      images: [`img/apartment-01.jpg`],
      host: {
        id: "25",
        name: `Maria`,
        isPro: true,
        avatarUrl: `img/avatar-angelina.jpg`,
      },
      goods: [`Breakfast`],
      city: {
        name: `Berlin`,
        location: {
          latitude: 52.3909553943508,
          longitude: 4.85309666406198,
          zoom: 8,
        },
      },
    };

    const store = mockStore({
      PLACE_INFO: { placeInfo: place },
      USER: { isLoggedIn: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard place={place} cardName={CardName.CITIES} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("The house among olive")).toBeInTheDocument();
    expect(screen.getByText("Hotel")).toBeInTheDocument();
    expect(screen.getByText(/€169/i)).toBeInTheDocument();
    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /to bookmarks/i })
    ).toBeInTheDocument();
    expect(screen.getByAltText("Place image")).toBeInTheDocument();
  });
});
