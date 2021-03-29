import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import Loader from '../loader/loader';
import {fetchPlaceReviews} from '../../store/api-actions';
import {resetReviews} from '../../store/reducer/reviews/action';

const PlaceReview = (props) => {
  const {placeId} = props;

  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state) => state.USER);
  const {placeReviews, isReviewsLoaded} = useSelector(
      (state) => state.REVIEW
  );

  useEffect(() => {
    if (!isReviewsLoaded) {
      dispatch(fetchPlaceReviews(placeId));
    }

    return () => dispatch(resetReviews());
  }, [placeId]);

  if (!isReviewsLoaded) {
    return <Loader />;
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">
          {placeReviews.length}
        </span>
      </h2>
      {
        (placeReviews.length > 0)
          && <ReviewList reviews={placeReviews} />
      }
      {
        isLoggedIn && <ReviewForm placeId={placeId} />
      }
    </section>
  );
};

PlaceReview.propTypes = {
  placeId: PropTypes.string.isRequired,
};

export default PlaceReview;
