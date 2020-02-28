import * as React from 'react';
import { Switch, Typography, CircularProgress, Box } from "@material-ui/core"
import { RecordKeeperProperties } from '../models/RecordKeeper';
import { firestore } from 'firebase';

export interface DeHumidifierProps {
  record: RecordKeeperProperties;
}

export function DeHumidifier({ record }: DeHumidifierProps) {
  const [working, setWorking] = React.useState<boolean>(false);
  const [error, setError] = React.useState<false | string>(false);

  return (
    <div>
      <Typography>Dehumidifier {record.relayPowered ? "ON" : "OFF"}</Typography>
      {working ? (
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <CircularProgress variant="indeterminate" />
          <Typography><em>Working...</em></Typography>
        </Box>
      ) : (
          <Switch
            checked={record.relayPowered}
            title="Dehumidifier"
            onChange={e => toggle(e.target.checked)}
          />
        )}
    </div>
  );

  async function toggle(checked: boolean) {
    setWorking(true);
    try {
      await firestore().collection(record.collection)
        .doc(record.docID)
        .update({
          relayPowered: checked,
        });
    } catch (error) {
      console.error("Error updating relayPowered: ", error);
      setError("Error updating toggle!")
    } finally {
      setWorking(false)
    }
  }
}
