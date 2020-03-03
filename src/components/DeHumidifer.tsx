import * as React from 'react';
import { Switch, Typography, CircularProgress, Box, LinearProgress, Grid } from "@material-ui/core"
import { RecordKeeperProperties } from '../models/RecordKeeper';
import { firestore } from 'firebase';
import IOSSwitch from './IOSSwitch';

export interface DeHumidifierProps {
  record: RecordKeeperProperties;
}

export function DeHumidifier({ record }: DeHumidifierProps) {
  const [working, setWorking] = React.useState<boolean>(false);
  const [error, setError] = React.useState<false | string>(false);

  return (
    <Box m="auto" display="flex">
       <Typography component="div">
       {!!error && (
        <Typography color="error"><em>{error}</em></Typography>
      )}
       <Typography>De-humidifier</Typography>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <IOSSwitch
              checked={record.relayPowered}
              onChange={e => toggle(e.target.checked)}
            />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
        {working && (
        <>
          <LinearProgress variant="indeterminate" />
        </>
      )}
      </Typography>
    </Box>
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
      setError("Error updating toggle! Contact tech support")
    } finally {
      setWorking(false)
    }
  }
}
