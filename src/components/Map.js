import React, {useEffect, useState, useRef} from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const Map = ({zoomProp, centerProp}) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(centerProp["lng"]);
  const [lat, setLat] = useState(centerProp["lat"]);
  const [zoom, setZoom] = useState(zoomProp);


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  return (
        <div ref={mapContainer} className="map-container" />
    );
  }



  export default Map;