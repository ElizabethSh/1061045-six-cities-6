import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../common/const';
import {logOut} from '../../store/api-actions';

const PageHeader = (props) => {
  const {isLoggedIn, userLogout, usersEmail} = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.ROOT} className="header__logo-link">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user" style={{display: `flex`}}>
                {
                  isLoggedIn
                    ? (
                      <>
                        <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
                          <div className="header__avatar-wrapper user__avatar-wrapper" />
                          <span className="header__user-name user__name">{usersEmail}</span>
                        </Link>
                        <button
                          style={{marginLeft: `10px`}}
                          onClick={userLogout}
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <Link to={AppRoute.LOGIN} className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper" />
                        <span className="header__login">Sign in</span>
                      </Link>
                    )
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userLogout: PropTypes.func.isRequired,
  usersEmail: PropTypes.string,
};

const mapStateToProps = ({USER}) => {
  return {
    isLoggedIn: USER.isLoggedIn,
    usersEmail: USER.usersEmail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogout: () => dispatch(logOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
