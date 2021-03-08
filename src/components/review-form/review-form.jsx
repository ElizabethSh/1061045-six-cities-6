import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {sendPlaceReview} from '../../store/api-actions';
import {reviewProp} from '../../common/prop-types/review.prop';

const MAX_SIMBOL_AMOUNT = 300;
const MIN_SIMBOL_AMOUNT = 50;

const ReviewForm = (props) => {
  const {sendReview, placeId, placeReviews} = props;
  const [commentForm, setCommentForm] = useState({
    rating: null,
    comment: ``
  });

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    sendReview(placeId, commentForm);

    setCommentForm({
      ...commentForm,
      rating: null,
      comment: ``
    });
  };

  const handleInputChange = (evt) => {
    const {name, value} = evt.target;
    setCommentForm({...commentForm, [name]: value});
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div
        className="reviews__rating-form form__rating"
        onChange={handleInputChange}
        key={placeReviews.length}
      >
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={commentForm.comment}
        onChange={handleInputChange}
        maxLength={MAX_SIMBOL_AMOUNT}
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">
            50 characters
          </b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            !((commentForm.comment.length > MIN_SIMBOL_AMOUNT) && commentForm.rating)
          }
        >Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  sendReview: PropTypes.func.isRequired,
  placeId: PropTypes.string.isRequired,
  placeReviews: PropTypes.arrayOf(
      PropTypes.shape(reviewProp)
  ).isRequired,
};

const mapStateToProps = (state) => {
  return {
    placeReviews: state.reducer.placeReviews
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendReview: (id, formData) => dispatch(sendPlaceReview(id, formData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
