import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageFooter from "./page-footer";

describe("PageFooter", () => {
  it("should render logo image", () => {
    render(
      <MemoryRouter>
        <PageFooter />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/6 cities logo/i)).toBeVisible();
  });

  it("should have a link to the main page", () => {
    render(
      <MemoryRouter>
        <PageFooter />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /6 cities logo/i })).toBeVisible();
  });
});
