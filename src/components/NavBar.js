import React from "react";

function NavBar({setDay, setTime}) {

return(
    <div id="NavBar">     
    <button onClick={()=>{setDay("today"); setTime("am")}}>Today (am)</button>
    <button onClick={()=>{setDay("today"); setTime("pm")}}>Today (pm)</button>
    <button onClick={()=>{setDay("historic"); setTime("am")}}>Historic (am)</button>
    <button onClick={()=>{setDay("historic"); setTime("pm")}}>Historic (pm)</button>
    </div>
)}

export default NavBar;