import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Favorites from "./favorites";
import { createAPI } from "../../services/api";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router";

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);

describe(`Test 'Favorites'`, () => {
  it(`Favorites should render empty page if favorites are missing`, () => {
    const store = mockStore({
      USER: { isLoggedIn: true },
      FAVORITE: { isFavoritesLoaded: true, favorites: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Save properties to narrow down search or plan your future trips/i
      )
    ).toBeInTheDocument();
  });

  it(`Favorites should render Loader if data is loading`, () => {
    const store = mockStore({
      FAVORITE: { isFavoritesLoaded: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it(`Favorites should render correctly with favorites`, () => {
    const store = mockStore({
      PLACE_INFO: { placeInfo: {} },
      USER: { isLoggedIn: true },
      FAVORITE: {
        isFavoritesLoaded: true,
        favorites: [
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
            location: {},
            images: [``],
            host: {
              id: 25,
              name: `Maria`,
              isPro: true,
              avatarUrl: `img/avatar-angelina.jpg`,
            },
            goods: [`Breakfast`],
            city: { name: `Hamburg`, location: {} },
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(/Hamburg/i)).toBeInTheDocument();
    expect(screen.getByText(/The house among olive/i)).toBeInTheDocument();
    expect(screen.getByText(/hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/€169/i)).toBeInTheDocument();
  });
});
