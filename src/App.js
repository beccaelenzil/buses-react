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
  const [busesToMap, setBusesToMap] = useState([])
  const [showWindow, setShowWindow] = useState(true)

  let heading = ''
  if (time == "am" && day == "today"){
    heading = "Today (am)"
  } else if (time == "pm" && day == "today") {
    heading = "Today (pm)"
  }else if (time == "am" && day == "historic") {
    heading = "Historic (am)"
  }else if (time == "pm" && day == "historic") {
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

  }, []);


  const zoom = 10
  const center = {lat: 47.62, lng: -122.3321} 
  

  
  
  const filterBuses = () => {
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


    const newBuses = {}
    for (let bus of buses){
        const schoolName = bus["school"]
        if (schools[schoolName] && bus["time"] === time && day === "historic"){
          if (newBuses[schoolName]){
            newBuses[schoolName]["duration"] += parseInt(bus["duration"])
          } else {
            newBuses[schoolName] = {
              "lat": schools[schoolName]["lat"],
              "lng": schools[schoolName]["lng"],
              "duration": parseInt(bus["duration"]),
              "route": "",
            }
          }
        } else if (schools[schoolName] && bus["time"] === time && day === "today" && bus["day"]===date && months[bus["month"]] ===month && bus["year"]===year) { 
          newBuses[schoolName] = {
            "lat": schools[schoolName]["lat"],
            "lng": schools[schoolName]["lng"],
            "duration": bus["duration"],
            "route": bus["route"],
          }
        }
      }
      return newBuses
  }

  const updateBusesToMap = () => {
      let count = 0
      const newBusesToMap = []
      const newBuses = filterBuses()
      for (const schoolName in newBuses){
        const newBus = newBuses[schoolName]
        if (newBus){
        const busInfo = [schoolName, newBus["route"]].join(" ") + ": " + [newBus["duration"], "min"].join(" ")
        count += 1
      
        const marker = <Marker 
            time={time}
            day={day}
            showWindow={showWindow} 
            setShowWindow={setShowWindow}
            key={count} 
            popupContent={busInfo}
            position={{
              lat: parseFloat(newBus["lat"]), 
              lng: parseFloat(newBus["lng"]),
            }}
            />
        newBusesToMap.push(marker)}
          }
      setBusesToMap(newBusesToMap)
  }

  useEffect(updateBusesToMap, [buses, time, day])
  return (
    
    <div className="App">
      <header id="Title"><h1>Seattle Schools Late Buses</h1><h2>{heading}</h2></header>
      <NavBar setDay={setDay} setTime={setTime}/>
      <div className="Map" style={{ height: "50vh", width: "50vw" }}>
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}>
          <Map
            center={center}
            zoom={zoom}
            style={{ flexGrow: "1", height: "100%" }}
          >
            {busesToMap};
          </Map>
        </Wrapper>
      </div>
      <footer id="Footer">Created By Becca Elenzil - 2022</footer>
    </div>
  );
}

export default App;

