import React, {useEffect, useState, useRef, createRef} from "react";
import "./Marker.css"

const getSize = (duration, n, day) => {
    if (day == "historic"){
        if (n == 1){
            return "xs"
        } else if (n < 5) {
            return "small"
        } else if (n < 10) {
            return "med"
        } else if (n < 15) {
            return "large"
        } else {
            return "xl"
        }
    } else {
        if (duration <= 10){
            return "xs"
        }
        else if (duration <= 20){
            return "small"
        } else if (duration <= 30) {
            return "med"
        } else if (duration <= 60) {
            return "large"
        } else {
            return "xl"
        }
    }
    

}

const Marker = ({ onClick, children, feature }) => {
    const _onClick = () => {
      onClick(feature["text"]);
    };
  
    let className = "marker "
    className += getSize(feature["duration"], feature["n"], feature["day"])+" "
    className += feature["time"]
    console.log(className)
  
    return (
      <button onClick={_onClick} className={className}>
        {children}
      </button>
    );
  };

  export default Marker;