import React from "react";
import * as Moment from "moment";

interface Props {
  currentTempData: any;
}

function CurrentTempHum(props: Props) {
  const { records, first, last } = props.currentTempData;
  return (
    <div>
      <h3>Heres the current temp and humidity: </h3>
      <h1>Temp: {convertToF(records[last].temp)}F</h1>
      <h1> Hum: {records[last].humidity}%</h1>
      <h2>Updated: {Moment(last * 1).fromNow()}</h2>
      <h4>
        <em>This is updated every 5 minutes</em>
      </h4>
    </div>
  );

  function convertToF(C) {
    return (C * 9) / 5 + 32;
  }
}

export default CurrentTempHum;
