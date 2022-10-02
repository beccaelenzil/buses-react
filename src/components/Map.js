import React, {useEffect, useState, useRef} from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./Map.css"
 
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const Map = ({zoomProp, centerProp, busInfoList, day, time}) => {

  const mapContainer = useRef(null);
  //const map = useRef(null);
  const [lng, setLng] = useState(centerProp["lng"]);
  const [lat, setLat] = useState(centerProp["lat"]);
  const [zoom, setZoom] = useState(zoomProp);


  useEffect(() => {
    // if (!map) {
    //   return
    // }; // initialize map only once
    
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    console.log(busInfoList)

    busInfoList.map((feature) =>
      new mapboxgl.Marker().setLngLat({"lng": feature["lng"], "lat": feature["lat"]}).addTo(map)
    );
  }, [day, time]);


  return (
        <div ref={mapContainer} className="map-container" />
    );
  }



  export default Map;