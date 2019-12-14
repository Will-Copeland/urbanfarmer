import React from "react";
import { Chart } from "react-google-charts";
import * as Moment from "moment";
import { RecordKeeperProperties } from "../models/RecordKeeper";
import { TempData } from "../models/TempData";

interface Props {
  records: RecordKeeperProperties[];
}

function TempHumGraph(props: Props) {
  const [dataPoints, setDataPoints] = React.useState([]);
  
  React.useEffect(() => {
    getDataPoints();
  }, [props.records]);
  
  return (
    <div>
      <Chart
        chartType="LineChart"
        data={[["Time", "Temp", "Humidity"], ...dataPoints]}
        width="100%"
        height="600px"
        legendToggle
      />
    </div>
  );

  function getDataPoints() {
    // const recArr = Object.entries(props.records);
    const data = props.records.map((rec: RecordKeeperProperties) => {
      // console.log(rec);
      const points: TempData[] = rec.tempData;
      return points.map((pt: TempData) => {
        const time: string = Moment(pt.timeOfMeasurement * 1).format(
          "h:mm:ss a"
        );
        const temp = convertToF(pt.temp);
        const hum = pt.humidity;
        return [time, temp, hum];
      });
    });
    console.log(data);
    
    setDataPoints(data.flat()); 
  }

  function convertToF(C: number): number {
    return (C * 9) / 5 + 32;
  }
}

export default TempHumGraph;
