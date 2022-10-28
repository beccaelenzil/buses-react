import React, {useEffect, useState, useRef} from "react";
import Map from "./components/Map"
import BusInfo from "./components/BusInfo"
import NavBar from "./components/NavBar"
import axios from "axios";
import "./App.css";


function App() {
  
  const URL = "https://seattle-school-buses.herokuapp.com/"
  const zoom = 9.25
  const center = {lat: 47.62, lng: -122.3321} 
 
  const getTime = (hour) => {
    hour = parseInt(hour)
    let timeOfDay = "am"
    if (hour > 14){
      timeOfDay = "pm"
    }
    return timeOfDay
  }
  const average = array => array.reduce((a, b) => a + b) / array.length;

  const [schools, setSchools] = useState({})
  const [buses, setBuses] = useState([])
  const [time, setTime] = useState(getTime(new Date().getHours()-7))
  const [day, setDay] = useState("today")
  const [infoList, setInfoList] = useState([])
  const [markerList, setMarkerList] = useState([])

  let heading = ''
  if (time == "am" && day == "today"){
    heading = "Today (am)"
  } else if (time == "pm" && day == "today") {
    heading = "Today (pm)"
  }else if (time == "am" && day == "historic") {
    heading = "Historic Average (number of buses) (am)"
  }else if (time == "pm" && day == "historic") {
    heading = "Historic Average (number of buses) (pm)"
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
        }).then()
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterBuses = () => {
    const today = new Date()
    const months = {
      January: "1",
      February: "2",
      March: "3",
      April: "4",
      May: "5",
      June: "6",
      July: "7",
      August: "8",
      September: "9",
      October: "10",
      November: "11",
      December: "12"
    }

    const month = String(today.getMonth() + 1)
    const date = String(today.getDate())
    const year = String(today.getFullYear())

    const newBuses = {}
    for (let bus of buses){
        const schoolName = bus["school"]
        const lat = schools[schoolName] ? schools[schoolName]["lat"] : null
        const lng = schools[schoolName] ? schools[schoolName]["lng"] : null
        const duration = bus["units"] == "hours" || bus["units"] == "hour"? parseInt(bus["duration"])*60 : parseInt(bus["duration"])
        if (bus["time"] === time && day === "historic"){
          
          if (newBuses[schoolName]){
            newBuses[schoolName]["duration"].push(duration)
            //newBuses[schoolName]["duration"] += ", "+bus["duration"]+" "+bus["units"]
          } else {
            
            newBuses[schoolName] = {
              lat: lat,
              lng: lng,
              duration: [duration]
            }
          }
        } else if (bus["time"] === time && day === "today" && bus["day"]===date && months[bus["month"]] ===month && bus["year"]===year) { 
          newBuses[schoolName + " " + bus["route"]] = {
            lat: lat,
            lng: lng,
            duration: [duration],
          } 
        }
      }
      return newBuses
  }

  //bubble sort to practice bubble sort
  const sortInfo = (busInfo) => {
    let sortBy = "n"
    if (day == "today"){
      sortBy = "todaysDuration"
    }
    else if (day === "historic") {
      sortBy = "n"
    }
    for(let i = 0; i < busInfo.length; i++){
        // Last i elements are already in place 
        for(let j = 0; j < ( busInfo.length - i -1 ); j++){           
          // Checking if the item at present iteration
          // is greater than the next iteration
          if(busInfo[j][sortBy] < busInfo[j+1][sortBy]){
            // If the condition is true then swap them
            var temp = busInfo[j]
            busInfo[j] = busInfo[j + 1]
            busInfo[j+1] = temp
          }
        }
      }
      return busInfo
     }
     
  const updateBusesToMap = () => {
      let count = 0
      const newBusInfoList = []
      const newMarkerList = []
      const newBuses = filterBuses()
      for (const schoolName in newBuses){
          const newBus = newBuses[schoolName]
          if (newBus){
            count += 1
            const n = newBus["duration"].length
            const duration = day == "historic" ? parseInt(average(newBus["duration"])) + " mins - (" + n+ ")" : newBus["duration"][0] + " mins" 
            if (newBus["lat"] && newBus["lng"]){
              const marker = {
                text: schoolName + " - " + duration,
                lat: parseFloat(newBus["lat"]),
                lng: parseFloat(newBus["lng"]),
                key: count
              }
              newMarkerList.push(marker)
            }
            
            const popup = {
              text: schoolName + " - " + duration,
              key: count,
              n: n,
             todaysDuration: newBus["duration"][0]
            }
          newBusInfoList.push(popup)

        }
      }
      setInfoList(sortInfo(newBusInfoList))
      setMarkerList(newMarkerList)
  }

  useEffect(updateBusesToMap, [buses, day, time])

  return (
    <div className="App">
      <header id="Title"><h1>Seattle Schools Late Buses</h1><h2>{heading}</h2></header>
      <NavBar setDay={setDay} setTime={setTime}/>
      {infoList.length > 0 ? <BusInfo busInfoList={infoList}></BusInfo> : ""}
      <Map zoomProp={zoom} centerProp={center} markerList={markerList}/>
      <footer id="Footer"><p>Data Collected from <a href="https://www.seattleschools.org/departments/transportation/latebus/" target="_blank">seattleschools.org</a></p> <span style={{display: "block"}}>Created By Becca Elenzil - 2022</span></footer>
    </div>
  );
}

export default App;

