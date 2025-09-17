import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../review-form/review-form";
import ReviewList from "../review-list/review-list";
import Loader from "../loader/loader";
import { fetchPlaceReviewsAction } from "../../store/api-actions";
import { resetReviews } from "../../store/reducer/reviews/action";
import {
  getIsReviewsLoaded,
  getPlaceReviews,
} from "../../store/reducer/reviews/reviews";

const PlaceReview = ({ placeId }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.USER);
  const placeReviews = useSelector(getPlaceReviews);
  const isReviewsLoaded = useSelector(getIsReviewsLoaded);

  useEffect(() => {
    if (!isReviewsLoaded) {
      dispatch(fetchPlaceReviewsAction(placeId));
    }

    return () => dispatch(resetReviews());
  }, [placeId]);

  if (!isReviewsLoaded) {
    return <Loader />;
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{placeReviews.length}</span>
      </h2>
      {Boolean(placeReviews.length) && <ReviewList />}
      {isLoggedIn && <ReviewForm placeId={placeId} />}
    </section>
  );
};

PlaceReview.propTypes = {
  placeId: PropTypes.string.isRequired,
};

export default PlaceReview;
