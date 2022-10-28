import React, {useEffect, useState, useRef} from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./Map.css"
 
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const Map = ({zoomProp, centerProp, markerList}) => {

  const mapContainer = useRef(null);
  const [lng, setLng] = useState(centerProp["lng"]);
  const [lat, setLat] = useState(centerProp["lat"]);
  const [zoom, setZoom] = useState(zoomProp);


  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    markerList.map((feature) =>
      new mapboxgl.Marker().setPopup(new mapboxgl.Popup().setHTML(feature["text"])).setLngLat({"lng": feature["lng"], "lat": feature["lat"]}).addTo(map)
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, [markerList]);


  return (
        <div ref={mapContainer} id="map-container" />
    );
  }



  export default Map;