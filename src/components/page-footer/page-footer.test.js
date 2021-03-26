import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import PageFooter from './page-footer';
import {Router} from 'react-router';

it(`PageFooter should render correctly`, () => {
  const history = createMemoryHistory();
  const {getByAltText, getByRole} = render(
      <Router history={history}>
        <PageFooter />
      </Router>
  );

  const linkElement = getByRole(`link`);
  const imageElement = getByAltText(`6 cities logo`);

  expect(linkElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
});
