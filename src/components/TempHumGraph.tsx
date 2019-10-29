import React from 'react'
import { Chart } from "react-google-charts";
import * as Moment from "moment";

interface Props {
    records: any;
}

function TempHumGraph(props: Props) {
    const [dataPoints, setDataPoints] = React.useState([]);

    React.useEffect(() => {
        getDataPoints();
    }, [props.records])

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
        const data = props.records.map(rec => {
            // console.log(rec);
            const points = Object.entries(rec.records);
            const timeTemp = points.map(pt => {
                const time = Moment(pt[0] * 1).format("h:mm:ss a");
                const temp = convertToF(pt[1].temp);
                const hum = pt[1].humidity;
                return [time, temp * 1, hum * 1];  
            })
            
            return timeTemp;
        });
        
        setDataPoints(data.flat());
    } 

    function convertToF(C) {
        return (C * 9) / 5 + 32;
      }
}

export default TempHumGraph
