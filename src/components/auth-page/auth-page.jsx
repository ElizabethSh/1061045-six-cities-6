import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {logIn} from '../../store/api-actions';
import PageHeader from '../page-header/page-header';
import {AppRoute} from '../../common/const';
import {getIsloggedInStatus} from '../../store/reducer/user/selectors';

const AuthPage = (props) => {
  const {onFormSubmit, isLoggedIn} = props;
  const history = useHistory();

  if (isLoggedIn) {
    history.push(AppRoute.ROOT);
  }

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    onFormSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });

    history.push(AppRoute.ROOT);
  };

  return (
    <div className="page page--gray page--login">
      <PageHeader />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit = {(evt) => handleFormSubmit(evt)}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                  ref={emailRef}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                  ref={passwordRef}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.ROOT}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

AuthPage.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: getIsloggedInStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (formData) => dispatch(logIn(formData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
