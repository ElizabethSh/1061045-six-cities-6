import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import Loader from '../loader/loader';
import {fetchPlaceReviews} from '../../store/api-actions';
import {reviewProp} from '../../common/prop-types/review.prop';

const PlaceReview = (props) => {
  const {
    isLoggedIn,
    placeId,
    loadReviews,
    isReviewsLoaded,
    placeReviews
  } = props;

  useEffect(() => {
    if (!isReviewsLoaded) {
      loadReviews(placeId);
    }
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
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.reducer.isLoggedIn,
    isReviewsLoaded: state.reducer.isReviewsLoaded,
    placeReviews: state.reducer.placeReviews
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadReviews: (id) => dispatch(fetchPlaceReviews(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceReview);
