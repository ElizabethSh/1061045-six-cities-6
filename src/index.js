import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const places = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    price: 120,
    photo: `img/apartment-01.jpg`,
  },
  {
    title: `Wood and stone place`,
    price: 80,
    photo: `img/apartment-02.jpg`,
  },
  {
    title: `Canal View Prinsengracht`,
    price: 132,
    photo: `img/apartment-01.jpg`,
  },
  {
    title: `Nice, cozy, warm big bed appartment`,
    price: 180,
    photo: `img/apartment-03.jpg`,
  },
  {
    title: `Wood and stone place`,
    price: 80,
    photo: `img/room.jpg`,
  },
];

ReactDOM.render(
    <App
      places = {places}
    />,
    document.getElementById(`root`)
);
