import React from "react";
import * as Moment from "moment";
import { RecordKeeperProperties } from "../models/RecordKeeper";
import { TempData } from "../models/TempData";

interface Props {
  record: RecordKeeperProperties;
}

function CurrentTempHum({ record }: Props) {
  const tempData: TempData[] = record.tempData;  
  const now = tempData[tempData.length - 1];

  return (
    <div>
      <h1>Temp: {convertToF(now.temp)}F</h1>
      <h1> Hum: {Math.floor(now.humidity)}%</h1>
      <h2>Updated: {Moment(now.timeOfMeasurement).fromNow()} || {Moment(now.timeOfMeasurement).format("MM/DD hh:mma")}</h2>

    </div>
  );

  function convertToF(C) {
    return Math.floor((C * 9) / 5 + 32);
  }
}

export default CurrentTempHum;
