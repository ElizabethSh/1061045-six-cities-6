import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import Leaflet from 'leaflet';
import {useSelector} from 'react-redux';
import {placeProp} from '../../common/prop-types/place.prop';
import {cityProp} from '../../common/prop-types/city.prop';
import {getCityPlaces} from '../../common/utils';
import 'leaflet/dist/leaflet.css';

let layerGroup;

const Map = (props) => {
  const {places, city, placeInfo} = props;
  const {activeCard} = useSelector((state) => state.CARD);
  const mapRef = useRef();
  const cityPlaces = getCityPlaces(places, city);

  const mapCitySettings = cityPlaces[0].city.location;

  useEffect(() => {
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

    const icon = Leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });


    const activeIcon = Leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 30]
    });


    places.map((place) => {
      const pin = (place.id === activeCard) ? activeIcon : icon;
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
  placeInfo: PropTypes.shape(placeProp),
};

export default Map;
