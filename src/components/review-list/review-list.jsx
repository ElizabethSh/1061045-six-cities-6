import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review';
import {reviewProp} from '../../common/prop-types/review.prop';

const ReviewList = ({reviews}) => {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => {
        return (
          <Review
            key={review.id}
            review={review}
          />
        );
      })}
    </ul>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewProp)
  ).isRequired,
};

export default ReviewList;
