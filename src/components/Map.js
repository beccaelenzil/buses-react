import React, {useEffect, useState, useRef} from "react";

const Map = ({ onClick, onIdle, children, style, ...options }) => {
    const ref = useRef(null);
    const [map, setMap] = useState();
  
    useEffect(() => {
      if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
      }
    }, [ref, map]);
  
    useEffect(() => {
      if (map) {
        map.setOptions(options);
      }
    }, [map, options]);
  
    useEffect(() => {
      if (map) {
        ["click", "idle"].forEach((eventName) =>
          window.google.maps.event.clearListeners(map, eventName)
        );
  
        if (onClick) {
          map.addListener("click", onClick);
        }
  
        if (onIdle) {
          map.addListener("idle", () => onIdle(map));
        }
      }
    }, [map, onClick, onIdle]);
  
    return (
      <>
        <div ref={ref} style={style} />
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { map });
          }
        })}
      </>
    );
  };

  export default Map;