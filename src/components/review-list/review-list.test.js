import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ReviewList from "./review-list";
import { mockStore } from "../../test-utils/mock-store";

const reviews = [
  {
    offerId: 1,
    comment: `Good`,
    date: `2019-09-08T14:13:56.569Z`,
    id: 1,
    rating: 4,
    user: {
      avatarUrl: `img/avatar-max.jpg`,
      id: 4,
      isPro: false,
      name: `Max`,
    },
  },
  {
    offerId: 1,
    comment: `Cozy`,
    date: `2020-06-08T14:13:56.569Z`,
    id: 2,
    rating: 4,
    user: {
      avatarUrl: `img/avatar-max.jpg`,
      id: 5,
      isPro: true,
      name: `Alex`,
    },
  },
  {
    offerId: 2,
    comment: `Perfect`,
    date: `2020-05-28T14:13:56.569Z`,
    id: 3,
    rating: 5,
    user: {
      avatarUrl: `img/avatar-max.jpg`,
      id: 6,
      isPro: true,
      name: `Frederik`,
    },
  },
];

describe("ReviewList", () => {
  it("renders all reviews with correct content", () => {
    const store = mockStore({
      REVIEW: { placeReviews: reviews, isReviewsLoaded: true },
    });

    render(
      <Provider store={store}>
        <ReviewList />
      </Provider>
    );

    // Check that all comments are rendered
    expect(screen.getByText("Good")).toBeInTheDocument();
    expect(screen.getByText("Cozy")).toBeInTheDocument();
    expect(screen.getByText("Perfect")).toBeInTheDocument();

    // Check that all user names are rendered
    expect(screen.getByText("Max")).toBeInTheDocument();
    expect(screen.getByText("Alex")).toBeInTheDocument();
    expect(screen.getByText("Frederik")).toBeInTheDocument();

    // Check that Pro status is rendered for Pro users
    expect(screen.getAllByText("Pro")).toHaveLength(2);
  });

  it("renders empty list if there are no reviews", () => {
    const store = mockStore({
      REVIEW: { placeReviews: [], isReviewsLoaded: true },
    });

    render(
      <Provider store={store}>
        <ReviewList />
      </Provider>
    );

    // Should not find any review comments
    expect(screen.queryByText("Good")).not.toBeInTheDocument();
    expect(screen.queryByText("Cozy")).not.toBeInTheDocument();
    expect(screen.queryByText("Perfect")).not.toBeInTheDocument();
  });
});
