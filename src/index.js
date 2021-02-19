import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mock/offers';
import {reviews} from './mock/reviews';

ReactDOM.render(
    <App
      places = {offers}
      reviews = {reviews}
    />,
    document.getElementById(`root`)
);
