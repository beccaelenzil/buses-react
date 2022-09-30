import React, {useEffect, useState} from "react";

const Marker = (options) => {
    const [marker, setMarker] = useState(null);
    const [infowindow, setInfoWindow] = useState(new window.google.maps.InfoWindow({
      content: options.popupContent
    }));
  
    useEffect(() => {
      if (!marker) {
        setMarker(new window.google.maps.Marker());
      }
  
      return () => {
        if (marker) {
          marker.setMap(null);  
        }
      };
    }, [marker]);


    useEffect(()=>{infowindow.close();}, [options.time, options.day])
  
    useEffect(() => {
      if (marker && infowindow) {
        marker.setOptions(options);
        
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            shouldFocus: false
          });
          setTimeout(function () { infowindow.close()}, 3000);
        });
      }
    }, [marker, options]);
  
    return null;
  };

export default Marker;