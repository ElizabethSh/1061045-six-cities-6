import React from 'react';
import {render} from '@testing-library/react';
import EmptyFavoritesContainer from './empty-favorites-container';

it(`EmptyFavoritesContainer should render correctly`, () => {
  const {getByText} = render(
      <EmptyFavoritesContainer />
  );

  const headerElement = getByText(`Nothing yet saved.`);
  const paragraphElement = getByText(
      `Save properties to narrow down search or plan your future trips.`
  );

  expect(headerElement).toBeInTheDocument();
  expect(paragraphElement).toBeInTheDocument();
});
