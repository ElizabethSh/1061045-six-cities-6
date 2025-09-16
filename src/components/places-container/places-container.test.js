import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createAPI } from "../../services/api";
import { MemoryRouter } from "react-router";
import PlacesContainer from "./places-container";
import { SortType } from "../../common/const";

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);

describe("Test 'PlacesContainer'", () => {
  it("should render Loader when data is loading", () => {
    const store = mockStore({
      SORT: { sortType: SortType.POPULAR },
      CARD: { activeCard: 0 },
      PLACE_INFO: { placeInfo: {} },
      OFFER: { isOffersLoaded: false, offers: [], activeCity: "Paris" },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesContainer />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("should render empty state if there are no places", () => {
    const store = mockStore({
      SORT: { sortType: SortType.POPULAR },
      CARD: { activeCard: 0 },
      PLACE_INFO: { placeInfo: {} },
      OFFER: { isOffersLoaded: true, offers: [], activeCity: "Paris" },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesContainer />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
  });

  it("should render places list if offers are present", () => {
    const store = mockStore({
      SORT: { sortType: SortType.POPULAR },
      CARD: { activeCard: 0 },
      PLACE_INFO: { placeInfo: {} },
      USER: { isLoggedIn: false },
      OFFER: {
        isOffersLoaded: true,
        activeCity: "Paris",
        offers: [
          {
            id: 1,
            title: "Cozy Apartment",
            price: 120,
            type: "apartment",
            isFavorite: false,
            isPremium: false,
            rating: 4,
            bedrooms: 1,
            description: "Nice place",
            maxAdults: 2,
            location: { latitude: 48.83861, longitude: 2.350499, zoom: 16 },
            images: [""],
            host: { id: 2, name: "John", isPro: false, avatarUrl: "" },
            goods: ["Wi-Fi"],
            city: {
              name: "Paris",
              location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
            },
            previewImage: "",
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesContainer />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Cozy Apartment/i)).toBeInTheDocument();
    expect(screen.getByText("Apartment")).toBeInTheDocument();
    expect(screen.getByText(/€120/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });

  it(`PlacesContainer should render multiple places with sorting`, () => {
    const store = mockStore({
      SORT: { sortType: SortType.PRICE_HIGHT_TO_LOW },
      CARD: { activeCard: 15 },
      PLACE_INFO: { placeInfo: {} },
      USER: { isLoggedIn: true },
      OFFER: {
        activeCity: `Paris`,
        isOffersLoaded: true,
        offers: [
          {
            title: `The house among olive`,
            price: 169,
            previewImage: ``,
            type: `hotel`,
            isFavorite: true,
            isPremium: true,
            rating: 5,
            id: 15,
            bedrooms: 2,
            description: ``,
            maxAdults: 2,
            location: { latitude: 48.83861, longitude: 2.350499, zoom: 16 },
            images: [``],
            host: { id: 25, name: `Maria`, isPro: true, avatarUrl: `` },
            goods: [`Breakfast`],
            city: {
              name: `Paris`,
              location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
            },
          },
          {
            title: `The house among olive`,
            price: 169,
            previewImage: ``,
            type: `hostel`,
            isFavorite: false,
            isPremium: false,
            rating: 5,
            id: 19,
            bedrooms: 2,
            description: ``,
            maxAdults: 2,
            location: {
              latitude: 48.837610000000005,
              longitude: 2.3454990000000002,
              zoom: 16,
            },
            images: [``],
            host: { id: 25, name: `Helga`, isPro: true, avatarUrl: `` },
            goods: [`Wi-Fi`],
            city: {
              name: `Paris`,
              location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
            },
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesContainer />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(`The house among olive`)).toHaveLength(2);
    expect(screen.getByText(/hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/hostel/i)).toBeInTheDocument();
    expect(screen.getAllByText(/€169/i)).toHaveLength(2);
  });
});
