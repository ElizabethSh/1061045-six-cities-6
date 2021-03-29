import React from 'react';
import {render} from '@testing-library/react';
import EmptyFavoritesContainer from './empty-favorites-container';

it(`EmptyFavoritesContainer should render correctly`, () => {
  const {container} = render(
      <EmptyFavoritesContainer />
  );

  expect(container).toMatchSnapshot();
});
