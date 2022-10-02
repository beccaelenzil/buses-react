import React, {useEffect, useState} from "react";

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