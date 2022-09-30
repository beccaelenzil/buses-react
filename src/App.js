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
  

  const updateBusesToMap = () => {
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

  const newBusesToMap = []
  const new_buses = {}
  for (let bus of buses){
      count += 1
      const name = bus["school"]
      if (schools[bus["school"]] && bus["time"] === time){
        if (day === "historic"){
          if (name in new_buses){
            new_buses[name]["duration"] += bus["units"] === "minutes" ? parseInt(bus["duration"]) : 60*parseInt(bus["duration"])
          } else {
            new_buses[name] = {
              "lat": schools[name]["lat"],
              "lng": schools[name]["lng"],
              "duration": parseInt(bus["duration"]),
              "route": "",
              "units": "minutes",
            }
          }
        } else {
          new_buses[name] = {
            "lat": schools[name]["lat"],
            "lng": schools[name]["lng"],
            "duration": bus["duration"],
            "route": bus["route"],
            "units": bus["units"]
          }
        }
        const new_bus = new_buses[name]
        const busInfo = [name, new_bus["route"]].join(" ") + ": " + [new_bus["duration"], new_bus["units"].slice(0,3)].join(" ")
        console.log(busInfo)
        const marker = <Marker 
        showWindow={showWindow} 
        key={count} 
        popupContent={busInfo}
        position={{
          lat: parseFloat(new_bus["lat"]), 
          lng: parseFloat(new_bus["lng"]),
        }}/>
        console.log(new_bus)
        if (day === "today" && bus["day"] === date && months[bus["month"]] === month && bus["year"] === year){
          newBusesToMap.push(marker)
        } else if (day === "historic") {
          newBusesToMap.push(marker)
        }
      }
    }
    
    setBusesToMap(newBusesToMap)
  }

  useEffect(updateBusesToMap, [buses, time, day])
  useEffect(()=>{setShowWindow(true)}, [time, day])




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

