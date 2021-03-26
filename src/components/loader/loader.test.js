import React from 'react';
import {render} from '@testing-library/react';
import Loader from './loader';

it(`Loader should render correctly`, () => {
  const {getByText} = render(
      <Loader />
  );
  const paragraphElement = getByText(`Loading...`);

  expect(paragraphElement).toBeInTheDocument();
});
