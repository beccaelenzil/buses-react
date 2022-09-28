import { Wrapper } from "@googlemaps/react-wrapper";
import React, {useEffect, useState} from "react";
import Map from "./components/Map"
import Marker from "./components/Marker"
import axios from "axios";
// import schools from "./data/seattle_schools_list.json"

function App() {
  

  URL = "https://seattle-school-buses.herokuapp.com/"

  const [schools, setSchools] = useState([])
  const [buses, setBuses] = useState([])

  useEffect(() => {
    axios
      .get(URL+"schools")
      .then((response) => {
        const newSchools = response.data
        setSchools(Object.values(newSchools));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(URL+"buses")
      .then((response) => {
        const newBuses = response.data
        setBuses(newBuses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const zoom = 11
  const center = {lat: 47.606, lng: -122.332} 
  let count = 0

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Wrapper apiKey={process.env.NODE_ENV}>
        <Map
          center={center}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {schools === [] ? <p>Loading</p> :
          schools.map((school) => {
            count += 1
            return <Marker key={count} 
            school={school["name"]}
            position={{
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

