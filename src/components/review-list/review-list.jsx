import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review";
import { reviewProp } from "../../common/prop-types/review.prop";
import { sortReviewsByDate } from "../../common/utils";
import { useSelector } from "react-redux";
import { getPlaceReviews } from "../../store/reducer/reviews/reviews";

const MAX_REVIEWS_AMOUNT = 10;

const ReviewList = () => {
  const placeReviews = useSelector(getPlaceReviews);
  const reviewsCopy = placeReviews.slice();
  sortReviewsByDate(reviewsCopy);

  return (
    <ul className="reviews__list">
      {reviewsCopy.slice(0, MAX_REVIEWS_AMOUNT).map((review) => {
        return <Review key={review.id} review={review} />;
      })}
    </ul>
  );
};

export default ReviewList;
