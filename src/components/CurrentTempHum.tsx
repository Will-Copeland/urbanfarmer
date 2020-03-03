import React from "react";
import * as Moment from "moment";
import { RecordKeeperProperties } from "../models/RecordKeeper";
import { TempData } from "../models/TempData";
import { Typography, Box, TextField } from "@material-ui/core";
import { DeHumidifier } from "./DeHumidifer";

interface Props {
  record: RecordKeeperProperties;
}

function CurrentTempHum({ record }: Props) {
  const tempData: TempData[] = record.tempData;
  const now = tempData[tempData.length - 1];

  return (
    <Box>
      <Box display="flex" justifyContent="center" flexDirection="column">
      <Typography style={{ width: "max-content", alignSelf: "center" }} variant="h1">{Math.floor(now.humidity)}%</Typography>
      <DeHumidifier record={record} />
      </Box>
      <Box mt="2rem" display="flex" justifyContent="center" flexDirection="column">
        <Typography variant="h1" style={{ width: "max-content", alignSelf: "center" }}>{convertToF(now.temp)}F</Typography>
      </Box>
      <Typography variant="caption">Updated: {Moment(now.timeOfMeasurement).fromNow()}</Typography>
    </Box>
  );

  function convertToF(C) {
    return Math.floor((C * 9) / 5 + 32);
  }
}

export default CurrentTempHum;
