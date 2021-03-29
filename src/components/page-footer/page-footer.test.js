import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import PageFooter from './page-footer';
import {Router} from 'react-router';

it(`PageFooter should render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <PageFooter />
      </Router>
  );

  expect(container).toMatchSnapshot();
});
