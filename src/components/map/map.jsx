import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import Leaflet from 'leaflet';
import {placePropTypes} from '../../common/place-prop-types';

import 'leaflet/dist/leaflet.css';

const cityName = `Amsterdam`;

const Map = ({places}) => {
  const mapRef = useRef();

  // cортировка по городу
  const cityPlaces = places.filter((place) => place.city.name === cityName);
  const mapCitySettings = cityPlaces[0].city.location;

  useEffect(() => {

    // настройка вида иконки
    const icon = Leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    // инициализация карты
    mapRef.current = Leaflet.map(`map`, {
      center: {
        lat: mapCitySettings.latitude,
        lng: mapCitySettings.longitude
      },
      zoom: mapCitySettings.zoom,
      zoomControl: false,
      marker: true
    });
    mapRef.current.setView({
      lat: mapCitySettings.latitude,
      lng: mapCitySettings.longitude
    }, mapCitySettings.zoom);

    // подключение слоя карты
    Leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
          contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      }).addTo(mapRef.current);

    // отрисовка всех меток на карте
    places.map((coords) => {
      Leaflet
        .marker({
          lat: coords.location.latitude,
          lng: coords.location.longitude
        }, {icon})
        .addTo(mapRef.current);
    });

    return () => {
      mapRef.current.remove();
    };
  });

  return (
    <div id="map" style={{height: `100%`}} ref={mapRef}></div>
  );
};

Map.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(placePropTypes)
  ).isRequired,
};

export default Map;
