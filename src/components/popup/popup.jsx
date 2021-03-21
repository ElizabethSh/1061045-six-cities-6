import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeErrorStatus} from '../../store/reducer/offers/offers-action';
import "./popup.css";

const Popup = (props) => {
  const {setErrorStatus} = props;

  const handleBackClick = () => {
    setErrorStatus(false);
  };

  const handleButtonClick = () => {
    setErrorStatus(false);
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

Popup.propTypes = {
  setErrorStatus: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorStatus: (status) => dispatch(changeErrorStatus(status))
  };
};

export default connect(null, mapDispatchToProps)(Popup);
