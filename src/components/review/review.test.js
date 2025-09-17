import React from "react";
import { render } from "@testing-library/react";
import Review from "./review";

it(`Review should render correctly`, () => {
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

  const { container } = render(<Review review={review} />);

  expect(container).toMatchSnapshot();
});
