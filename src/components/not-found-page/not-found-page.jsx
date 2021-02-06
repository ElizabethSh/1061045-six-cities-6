import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div >
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section style={{margin: `150px auto`, width: 420, textAlign: `center`}}>
          <h1 style={{padding: `20px 0 80px`}}>404: Page is not found</h1>
          <Link
            className="button form__submit"
            to="/"
          >Go back to the main page</Link>
        </section>
      </main>

      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
};

export default NotFoundPage;
