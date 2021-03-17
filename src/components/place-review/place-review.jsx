import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import Loader from '../loader/loader';
import {fetchPlaceReviews} from '../../store/api-actions';
import {reviewProp} from '../../common/prop-types/review.prop';
import {resetReviews} from '../../store/reducer/reviews/reviews-action';
import {getIsloggedInStatus} from '../../store/reducer/user/selectors';
import {getIsReviewsLoaded, getPlaceReviews} from '../../store/reducer/reviews/selectors';

const PlaceReview = (props) => {
  const {
    isLoggedIn,
    placeId,
    loadReviews,
    isReviewsLoaded,
    placeReviews,
    resetPlaceReviews
  } = props;

  useEffect(() => {
    if (!isReviewsLoaded) {
      loadReviews(placeId);
    }

    return () => resetPlaceReviews();
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
  isLoggedIn: PropTypes.bool.isRequired,
  placeId: PropTypes.string.isRequired,
  isReviewsLoaded: PropTypes.bool.isRequired,
  loadReviews: PropTypes.func.isRequired,
  placeReviews: PropTypes.arrayOf(
      PropTypes.shape(reviewProp)
  ).isRequired,
  resetPlaceReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: getIsloggedInStatus(state),
    isReviewsLoaded: getIsReviewsLoaded(state),
    placeReviews: getPlaceReviews(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadReviews: (id) => dispatch(fetchPlaceReviews(id)),
    resetPlaceReviews: () => dispatch(resetReviews())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceReview);
