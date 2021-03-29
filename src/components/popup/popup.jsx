import React from 'react';
import {useDispatch} from 'react-redux';
import {changeErrorStatus} from '../../store/reducer/offers/action';
import "./popup.css";

const Popup = () => {
  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(changeErrorStatus(status));
  };

  const handleButtonClick = () => {
    dispatch(changeErrorStatus(status));
  };

  return (
    <section className="error" onClick={handleBackClick}>
      <div className="error__inner">
        <h1 className="error__title">Data loading error</h1>
        <button
          className="error__button button"
          onClick={handleButtonClick}
        >Close</button>
      </div>
    </section>
  );
};

export default Popup;
