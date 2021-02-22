import React from 'react';
import {Link} from 'react-router-dom';
import PageFooter from '../page-footer/page-footer';
import PageHeader from '../page-header/page-header';

const NotFoundPage = () => {
  return (
    <div >
      <PageHeader />
      <main>
        <section style={{margin: `150px auto`, width: 420, textAlign: `center`}}>
          <h1 style={{padding: `20px 0 80px`}}>404: Page is not found</h1>
          <Link
            className="button form__submit"
            to="/"
          >Go back to the main page</Link>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default NotFoundPage;
