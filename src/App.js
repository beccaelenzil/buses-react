import { Wrapper } from "@googlemaps/react-wrapper";
import React from "react";
import Map from "./components/Map"
import Marker from "./components/Marker"
import schools from "./data/seattle_schools_list.json"


const zoom = 11
const center = {lat: 47.606, lng: -122.332}
const markers = schools.map((school) => {
  return {
    lat: parseFloat(school["lat"]), 
    lng: parseFloat(school["lng"])
  }
})


function App() {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Wrapper apiKey={"AIzaSyD4XxIrCSh0r6B6VKGLwX8EF8v1KfRFPBI"}>
        <Map
          center={center}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {schools.map((school) => {
            return <Marker position={{
              lat: parseFloat(school["lat"]), 
              lng: parseFloat(school["lng"])
            }} />;
          })}
        </Map>
      </Wrapper>
    </div>
  );
}

export default App;

