import React, {useEffect, useState, useRef, createRef} from "react";
import ReactDOM from "react-dom";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./Map.css"
import Marker from "./Marker.js"
 
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN


const Map = ({zoomProp, centerProp, markerList, amPm}) => {

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

    // Render custom marker components
    markerList.forEach((feature) => {
      console.log(feature)
      // Create a React ref
      const ref = createRef();
      // Create a new DOM node and save it to the React ref
      ref.current = document.createElement("div");
      // Render a Marker Component on our new DOM node
      ReactDOM.render(
        <Marker feature={feature} />,
        ref.current
      );
    

    // markerList.map((feature) =>
      new mapboxgl.Marker(ref.current).setPopup(
        new mapboxgl.Popup()
        .setHTML(feature["text"]))
        .setLngLat({"lng": feature["lng"], "lat": feature["lat"]})
        .addTo(map)
      });
      

    

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