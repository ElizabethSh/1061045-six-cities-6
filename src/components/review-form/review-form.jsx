import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { sendPlaceReviewAction } from "../../store/api-actions";
import { getPlaceReviews } from "../../store/reducer/reviews/reviews";

const MAX_SIMBOL_AMOUNT = 300;
const MIN_SIMBOL_AMOUNT = 50;

const ESTIMATIONS = [`perfect`, `good`, `not-bad`, `badly`, `terribly`];

const ReviewForm = (props) => {
  const { placeId } = props;
  const [commentForm, setCommentForm] = useState({
    rating: null,
    comment: ``,
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const placeReviews = useSelector(getPlaceReviews);
  const dispatch = useDispatch();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    setIsDisabled(true);
    dispatch(
      sendPlaceReviewAction(placeId, {
        ...commentForm,
        rating: Number(commentForm.rating),
      })
    )
      .then(() => {
        setCommentForm({
          ...commentForm,
          rating: null,
          comment: ``,
        });
      })
      .then(() => {
        setIsDisabled(false);
      });
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCommentForm({ ...commentForm, [name]: value });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div
        className="reviews__rating-form form__rating"
        onChange={handleInputChange}
        key={placeReviews.length}
      >
        {ESTIMATIONS.map((estimation, index) => {
          const starsCount = ESTIMATIONS.length - index;

          return (
            <Fragment key={`${estimation} - ${isDisabled}`}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={starsCount}
                id={`${starsCount}-stars`}
                type="radio"
                disabled={isDisabled}
              />
              <label
                htmlFor={`${starsCount}-stars`}
                className="reviews__rating-label form__rating-label"
                title={estimation}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={commentForm.comment}
        onChange={handleInputChange}
        maxLength={MAX_SIMBOL_AMOUNT}
        disabled={isDisabled}
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            !(
              commentForm.comment.length > MIN_SIMBOL_AMOUNT &&
              commentForm.rating
            )
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  placeId: PropTypes.string.isRequired,
};

export default ReviewForm;
