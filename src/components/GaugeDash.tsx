import * as React from 'react';
import GaugeChart from 'react-gauge-chart'
import { RecordKeeperProperties } from '../models/RecordKeeper';
import { TempData } from '../models/TempData';

interface GaugeDashProps {
  humidity: number;
}

const GaugeDash: React.FunctionComponent<GaugeDashProps> = ({ humidity }) => {
  return (
    <div>
      <GaugeChart id="gauge-chart-1"
        nrOfLevels={20}
        percent={humidity / 100}
        textColor="#000"
      />
    </div>
  );
};

export default GaugeDash;
