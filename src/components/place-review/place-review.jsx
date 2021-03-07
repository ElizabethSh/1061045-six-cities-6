import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import Loader from '../loader/loader';
import {adaptReviewsData} from '../../services/adapter';
import {api} from '../../index';

const PlaceReview = (props) => {
  const [placeReviews, setPlaceReviews] = useState([]);
  const [isReviewsLoaded, setLoadingStatus] = useState(false);

  const {isLoggedIn, placeId} = props;

  useEffect(() => {
    if (!isReviewsLoaded) {
      api.get(`comments/${placeId}`)
      .then(({data}) => data.map((it) => adaptReviewsData(it)))
      .then((data) => setPlaceReviews(data))
      .then(() => setLoadingStatus(true));
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
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.reducer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(PlaceReview);
