import React from 'react';
import PropTypes from 'prop-types';
import {reviewProp} from '../../common/prop-types/review.prop';
import {convertRatingToPersent, formatReviewDate, formatReviewDateTime} from '../../common/utils';

const Review = (props) => {
  const {review} = props;
  const {
    comment,
    rating,
    date,
    user,
  } = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
        {
          user.isPro && (
            <span className="property__user-status">Pro</span>
          )
        }
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: convertRatingToPersent(rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time
          className="reviews__time"
          dateTime={formatReviewDateTime(date)}
        >{formatReviewDate(date)}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: PropTypes.shape(reviewProp)
};

export default Review;
