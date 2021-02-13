import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mock/offers';

ReactDOM.render(
    <App
      places = {offers}
    />,
    document.getElementById(`root`)
);
