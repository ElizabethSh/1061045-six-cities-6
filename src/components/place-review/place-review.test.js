import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import PlaceReview from "./place-review";
import { mockStore } from "../../test-utils/mock-store";

describe(`Test 'PlaceReview'`, () => {
  it(`renders empty review list if reviews are missing`, () => {
    const store = mockStore({
      REVIEW: { isReviewsLoaded: true, placeReviews: [] },
      USER: { isLoggedIn: true },
    });

    render(
      <Provider store={store}>
        <PlaceReview placeId={"24"} />
      </Provider>
    );

    // Should show reviews title with 0
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    // Should show the review form
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    // Should not show any review item
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it(`renders Loader if data is loading`, () => {
    const store = mockStore({
      REVIEW: { isReviewsLoaded: false },
      USER: { isLoggedIn: true },
    });

    render(
      <Provider store={store}>
        <PlaceReview placeId={"44"} />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it(`renders reviews and form when loaded`, () => {
    const store = mockStore({
      USER: { isLoggedIn: true },
      REVIEW: {
        isReviewsLoaded: true,
        placeReviews: [
          {
            comment: "Nice stay!",
            date: `2020-04-23T08:04:28.647Z`,
            id: "2",
            rating: 4,
            user: {
              avatarUrl: "",
              id: "8",
              isPro: true,
              name: "Aretha",
            },
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <PlaceReview placeId={"53"} />
      </Provider>
    );

    // Should show reviews title and count
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    // Should show the review comment
    expect(screen.getByText("Nice stay!")).toBeInTheDocument();
    // Should show the review form
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    // Should show the reviewer's name
    expect(screen.getByText("Aretha")).toBeInTheDocument();
  });

  it(`does not show review form if user is not logged in`, () => {
    const store = mockStore({
      USER: { isLoggedIn: false },
      REVIEW: { isReviewsLoaded: true, placeReviews: [] },
    });

    render(
      <Provider store={store}>
        <PlaceReview placeId={"24"} />
      </Provider>
    );

    // Should not show the review form
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
