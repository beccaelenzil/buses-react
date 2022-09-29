import React, {useEffect} from "react";

const Marker = (options) => {
    const [marker, setMarker] = React.useState();
    const contentRef = React.useRef(null);
  
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
      const school_name = toString(options.school)
      if (marker) {
        
        const infowindow = new window.google.maps.InfoWindow({
          content: options.text
        });
        marker.setOptions(options);
  
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            shouldFocus: false
          });
        });
      }
    }, [marker, options]);
  
    return null;
  };

export default Marker;