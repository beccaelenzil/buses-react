import React from "react";
import "./BusInfo.css"

const BusInfo = ({busInfoList}) => {
    return(
        <div id="busList" className="button3">
            {busInfoList.map(busInfo =>
            <p key={busInfo.key}>{busInfo.text}</p>
            )}
        </div>
    )
}

export default BusInfo;