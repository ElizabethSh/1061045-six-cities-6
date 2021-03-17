import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import Leaflet from 'leaflet';
import {connect} from 'react-redux';
import {placeProp} from '../../common/prop-types/place.prop';
import {cityProp} from '../../common/prop-types/city.prop';
import {getCityPlaces} from '../../common/utils';
import 'leaflet/dist/leaflet.css';
import {getActiveCard} from '../../store/reducer/offers/selectors';

let layerGroup;

const Map = (props) => {
  const {places, city, activeCardId, placeInfo} = props;
  const mapRef = useRef();

  // cортировка по городу НЕ УДАЛЯТЬ!
  // брать сортировку из стора не годится для favorites -
  // будет ошибка в карте при открытии карточки
  const cityPlaces = getCityPlaces(places, city);

  // определение координат города
  const mapCitySettings = cityPlaces[0].city.location;

  useEffect(() => {

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

    layerGroup = Leaflet.layerGroup().addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };
  }, [city]);

  useEffect(() => {
    layerGroup.clearLayers();
    // настройка вида иконки
    const icon = Leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    // настройка вида активной иконки
    const activeIcon = Leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 30]
    });

    // отрисовка всех меток на карте
    places.map((place) => {
      const pin = (place.id === activeCardId) ? activeIcon : icon;
      Leaflet
        .marker({
          lat: place.location.latitude,
          lng: place.location.longitude
        }, {icon: pin})
        .addTo(layerGroup);
    });

    if (placeInfo) {
      Leaflet
        .marker({
          lat: placeInfo.location.latitude,
          lng: placeInfo.location.longitude
        }, {icon: activeIcon})
        .addTo(layerGroup);
    }
  });

  return (
    <div id="map" style={{height: `100%`}}></div>
  );
};

Map.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(placeProp)
  ).isRequired,
  city: cityProp,
  activeCardId: PropTypes.number,
  placeInfo: PropTypes.shape(placeProp),
};

const mapStateToProps = (state) => {
  return {
    activeCardId: getActiveCard(state), // значение равно offer.id
  };
};

export default connect(mapStateToProps)(Map);
