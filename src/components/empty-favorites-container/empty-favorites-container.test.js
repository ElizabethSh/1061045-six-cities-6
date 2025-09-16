import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyFavoritesContainer from "./empty-favorites-container";

describe("EmptyFavoritesContainer", () => {
  it("should render the empty favorites message", () => {
    render(<EmptyFavoritesContainer />);
    expect(
      screen.getByRole("heading", { name: /Favorites \(empty\)/i })
    ).toBeVisible();
    expect(screen.getByText(/Nothing yet saved/i)).toBeVisible();
    expect(
      screen.getByText(
        /Save properties to narrow down search or plan your future trips/i
      )
    ).toBeVisible();
  });
});
