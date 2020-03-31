import * as React from 'react';
import { firestore } from 'firebase';
import { Box } from '@material-ui/core';

interface indexProps {
}

const index: React.FunctionComponent<indexProps> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [inputs, setInputs] = React.useState([]);
  const [outputs, setOutputs] = React.useState([]);
  const [activeTriggers, setActiveTriggers] = React.useState([]);

  React.useEffect(() => {
    getInputs()
    getOutputs()
  }, [])


  if (loading) {
    return <h1>Loading component here. Call dev.</h1>
  }

  return (
    <Box>
      {activeTriggers.map(trigger => (
        // <ActiveTrigger trigger={trigger} />
        <h1>trigger element here</h1>
      ))}

      {/* <AddTrigger /> */}
    </Box>
  );


  async function getStuff() {
    await getInputs();
    await getOutputs();
    setLoading(false);
  }


  async function getInputs() {
    const inputs = (await (firestore().collection("activeInputs").get())).docs.map(doc => doc.data());
    console.log("inputs GOT: ", inputs, " delete me pls");
    setInputs(inputs);
  }

  async function getOutputs() {
    const outputs = (await (firestore().collection("activeOutputs").get())).docs.map(doc => doc.data());
    console.log("outputs GOT: ", outputs, " delete me pls");
    setOutputs(outputs);
  }
};

export default index;
