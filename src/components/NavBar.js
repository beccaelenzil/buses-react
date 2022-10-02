import React from "react";
import "./NavBar.css"
import "./ButtonStyle.css"

function NavBar({setDay, setTime}) {

return(
    <div id="NavBar">     
    <button className="button3" onClick={()=>{setDay("today"); setTime("am")}}>Today (am)</button>
    <button className="button3" onClick={()=>{setDay("today"); setTime("pm")}}>Today (pm)</button>
    <button className="button3" onClick={()=>{setDay("historic"); setTime("am")}}>Historic (am)</button>
    <button className="button3" onClick={()=>{setDay("historic"); setTime("pm")}}>Historic (pm)</button>
    </div>
)}

export default NavBar;