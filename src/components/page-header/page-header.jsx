import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppRoute } from "../../common/const";
import { logOutAction } from "../../store/api-actions";

const PageHeader = () => {
  const { isLoggedIn, usersEmail } = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to={AppRoute.ROOT}
              className="header__logo-link"
              name="six-cities-logo"
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user" style={{ display: `flex` }}>
                {isLoggedIn ? (
                  <>
                    <Link
                      to={AppRoute.FAVORITES}
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name">
                        {usersEmail}
                      </span>
                    </Link>
                    <button
                      type="button"
                      style={{ marginLeft: `10px` }}
                      onClick={() => dispatch(logOutAction())}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link
                    to={AppRoute.LOGIN}
                    className="header__nav-link header__nav-link--profile"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__login">Sign in</span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
