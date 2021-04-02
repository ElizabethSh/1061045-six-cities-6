import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {statusCode} from '../../common/const';
import {changeErrorStatus} from '../../store/reducer/offers/action';
import "./popup.css";

const Popup = () => {
  const dispatch = useDispatch();
  const {errorCode} = useSelector((state) => state.OFFER);

  let message = `Data loading error`;

  if (errorCode === statusCode.BAD_REQUEST) {
    message = `Wrong email or password`;
  }

  const handleBackClick = (evt) => {
    if (evt.target.tagName !== `SECTION`) {
      return;
    }
    dispatch(changeErrorStatus(status));
  };

  const handleButtonClick = () => {
    dispatch(changeErrorStatus(status));
  };

  return (
    <section className="error" onClick={(evt) => handleBackClick(evt)}>
      <div className="error__inner">
        <h1 className="error__title">{message}</h1>
        <button
          className="error__button button"
          onClick={handleButtonClick}
        >Close</button>
      </div>
    </section>
  );
};

export default Popup;
