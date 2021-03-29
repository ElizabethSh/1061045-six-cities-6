import React from 'react';
import {render} from "@testing-library/react";
import ReviewList from './review-list';

it(`ReviewList should render correctly`, () => {
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
        name: `Max`
      }
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
        name: `Alex`
      }
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
        name: `Frederik`
      }
    }
  ];

  const {container} = render(
      <ReviewList reviews={reviews}/>
  );

  expect(container).toMatchSnapshot();
});
