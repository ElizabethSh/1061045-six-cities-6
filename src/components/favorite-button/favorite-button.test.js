import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import FavoriteButton from "./favorite-button";
import { ButtonName } from "../../common/const";
import { MemoryRouter } from "react-router";

const mockStore = configureStore({});

describe(`Test 'FavoriteButton'`, () => {
  it(`FavoriteButton in the Place component should render as favorite`, () => {
    const store = mockStore({
      PLACE_INFO: { placeInfo: {} },
      USER: { isLoggedIn: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoriteButton
            isFavorite={true}
            buttonName={ButtonName.PROPERTY}
            placeId={99}
          />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("property__bookmark-button");
  });

  it(`FavoriteButton in the PlaceCard component should render as not favorite`, () => {
    const store = mockStore({
      PLACE_INFO: { placeInfo: {} },
      USER: { isLoggedIn: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoriteButton
            isFavorite={false}
            buttonName={ButtonName.PLACE_CARD}
            placeId={42}
          />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("place-card__bookmark-button");
  });
});
