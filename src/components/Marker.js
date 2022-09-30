import React, {useEffect, useState} from "react";

const Marker = (options) => {
    const [marker, setMarker] = useState();
  
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
  
    useEffect(() => {
      if (marker) {
        
        const infowindow = new window.google.maps.InfoWindow({
          content: options.popupContent
        });

        marker.setOptions(options);
        
  
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            shouldFocus: false
          });
        });

        setTimeout(function () { infowindow.close(); }, 3000);
      }
    }, [marker, options]);
  
    return null;
  };

export default Marker;