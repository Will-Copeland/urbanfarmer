import React from "react";
import * as Moment from "moment";
import { RecordKeeperProperties } from "../models/RecordKeeper";
import { TempData } from "../models/TempData";

interface Props {
  record: RecordKeeperProperties;
}

function CurrentTempHum({ record }: Props) {
  const tempData: TempData[] = record.tempData;
  console.log("tmp", tempData);
  
  const now = tempData[tempData.length - 1];
  return (
    <div>
      <h3>Heres the current temp and humidity: </h3>
      <h1>Temp: {convertToF(now.temp)}F</h1>
      <h1> Hum: {now.humidity}%</h1>
      <h2>Updated: {Moment(now.timeOfMeasurement).fromNow()}</h2>
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
