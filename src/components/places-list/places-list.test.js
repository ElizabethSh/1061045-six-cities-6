import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router";
import { CardsListName } from "../../common/const";
import { Provider } from "react-redux";
import PlacesList from "./places-list";

const mockStore = configureStore({});

describe(`Test 'PlacesList'`, () => {
  it(`should render place cards with correct info`, () => {
    const places = [
      {
        title: `Nice, cozy, warm big bed apartment`,
        price: 129,
        previewImage: `img/apartment-01.jpg`,
        type: `room`,
        isFavorite: false,
        isPremium: false,
        rating: 3,
        id: 17,
        bedrooms: 1,
        description: `A cozy place`,
        maxAdults: 1,
        location: {
          latitude: 52.3909553943508,
          longitude: 4.85309666406198,
          zoom: 8,
        },
        images: ["img/apartment-01.jpg"],
        host: {
          id: 25,
          name: `Angelina`,
          isPro: false,
          avatarUrl: `img/avatar-angelina.jpg`,
        },
        goods: [`Washer`],
        city: {
          name: `Amsterdam`,
          location: {
            latitude: 52.3909553943508,
            longitude: 4.85309666406198,
            zoom: 8,
          },
        },
      },
    ];

    const store = mockStore({
      PLACE_INFO: { placeInfo: places[0] },
      USER: { isLoggedIn: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesList
            places={places}
            placesListName={CardsListName.NEAR_PLACES_LIST}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText("Nice, cozy, warm big bed apartment")
    ).toBeInTheDocument();
    expect(screen.getByText("Room")).toBeInTheDocument();
    expect(screen.getByText(/€129/i)).toBeInTheDocument();
    expect(screen.getByAltText("Place image")).toBeInTheDocument();
  });
});
