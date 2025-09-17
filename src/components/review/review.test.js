import React from "react";
import { render, screen } from "@testing-library/react";
import Review from "./review";

describe("Review", () => {
  it("renders review content correctly", () => {
    const review = {
      offerId: "2",
      comment: `Cozy`,
      date: `2019-12-08T14:13:56.569Z`,
      id: "3",
      rating: 3,
      user: {
        avatarUrl: `img/avatar-max.jpg`,
        id: "6",
        isPro: true,
        name: `Frederik`,
      },
    };

    render(<Review review={review} />);

    // Check for user name
    expect(screen.getByText("Frederik")).toBeInTheDocument();
    // Check for comment
    expect(screen.getByText("Cozy")).toBeInTheDocument();
    // Check for Pro status
    expect(screen.getByText("Pro")).toBeInTheDocument();
    // Check for formatted date (e.g., December 2019)
    expect(screen.getByText(/December 2019/)).toBeInTheDocument();
    // Check for rating visually hidden label
    expect(screen.getByText("Rating")).toBeInTheDocument();
    // Check for avatar image
    expect(screen.getByAltText("Reviews avatar")).toBeInTheDocument();
  });

  it("does not render Pro status if user is not pro", () => {
    const review = {
      offerId: "2",
      comment: `Nice!`,
      date: `2020-01-08T14:13:56.569Z`,
      id: "4",
      rating: 5,
      user: {
        avatarUrl: `img/avatar-max.jpg`,
        id: "7",
        isPro: false,
        name: `Alex`,
      },
    };

    render(<Review review={review} />);

    expect(screen.getByText("Alex")).toBeInTheDocument();
    expect(screen.getByText("Nice!")).toBeInTheDocument();
    expect(screen.queryByText("Pro")).not.toBeInTheDocument();
  });
});
