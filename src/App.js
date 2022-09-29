import { Wrapper } from "@googlemaps/react-wrapper";
import React, {useEffect, useState} from "react";
import Map from "./components/Map"
import Marker from "./components/Marker"
import NavBar from "./components/NavBar"
import axios from "axios";
import "./App.css";

function App() {
  

  URL = "https://seattle-school-buses.herokuapp.com/"
  //URL = "http://127.0.0.1:5000/"

  const [schools, setSchools] = useState({})
  const [buses, setBuses] = useState([])
  const [time, setTime] = useState("am")
  const [day, setDay] = useState("today")


  let heading = ''
  if (time == "am" && day == "today"){
    heading = "Today (am)"
  } else if (time == "pm" && day == "today") {
    heading = "Today (pm)"
  }else if (time == "am" && day == "") {
    heading = "Historic (am)"
  }else if (time == "pm" && day == "") {
    heading = "Historic (pm)"
  }



  useEffect(() => {
    axios
      .get(URL+"schools")
      .then((response) => {
        const newSchools = response.data
        setSchools(newSchools);
        axios
        .get(URL+"buses")
        .then((response) => {
          const newBuses = response.data
          setBuses(newBuses);
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [day]);

  useEffect(() => {

  }, []);

  const zoom = 10
  const center = {lat: 47.62, lng: -122.3321} 
  let count = 0

  const today = new Date()


  const months = {
    "January": "1",
    "February": "2",
    "March": "3",
    "April": "4",
    "May": "5",
    "June": "6",
    "July": "7",
    "August": "8",
    "September": "9",
    "October": "10",
    "November": "11",
    "December": "12"
  }

const month = String(today.getMonth() + 1)
const date = String(today.getDate())
const year = String(today.getFullYear())



  const buses_to_map = []
  for (let bus of buses){
    if (schools[bus["school"]] && bus["time"] === time){
      
      if (day === "today" && bus["day"] === date && months[bus["month"]] === month && bus["year"] === year){
        buses_to_map.push(bus)
      } else if (day === "historic") {
        buses_to_map.push(bus)
      }
    }
  }






  return (
    
    <div className="App">
      <header id="Title"><h1>Seattle Schools Late Buses - {heading}</h1></header>
      <NavBar setDay={setDay} setTime={setTime} setBuses/>
      <div className="Map" style={{ height: "50vh", width: "50vw" }}>
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}>
          <Map
            center={center}
            zoom={zoom}
            style={{ flexGrow: "1", height: "100%" }}
          >
            {schools === {} || buses === [] ? <p>Loading</p> :
            buses_to_map.map((bus) => {
              count += 1
              const school = schools[bus["school"]]
              return <Marker key={count} 
              text={school["name"]}
              position={{
                lat: parseFloat(school["lat"]), 
                lng: parseFloat(school["lng"])
              }}/>;
            })}
          </Map>
        </Wrapper>
      </div>
      <footer id="Footer">Created By Becca Elenzil - 2022</footer>
    </div>
  );
}

export default App;
