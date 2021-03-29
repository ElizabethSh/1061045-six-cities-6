import React from 'react';
import {render} from '@testing-library/react';
import Loader from './loader';

it(`Loader should render correctly`, () => {
  const {container} = render(
      <Loader />
  );

  expect(container).toMatchSnapshot();
});
