import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review';
import {reviewProp} from '../../common/prop-types/review.prop';
import {sortReviewsByDate} from '../../common/utils';

const MAX_REVIEWS_AMOUNT = 10;

const ReviewList = ({reviews}) => {
  const reviewsCopy = reviews.slice();
  sortReviewsByDate(reviewsCopy);

  return (
    <ul className="reviews__list">
      {
        reviewsCopy
          .slice(0, MAX_REVIEWS_AMOUNT)
          .map((review) => {
            return (
              <Review
                key={review.id}
                review={review}
              />
            );
          })
      }
    </ul>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewProp)
  ).isRequired,
};

export default ReviewList;
