import React from "react"
import * as firebase from "firebase";
import Layout from "../components/layout"
import SEO from "../components/seo"
import CurrentTempHum from "../components/CurrentTempHum";
import TempHumGraph from "../components/TempHumGraph";
import { RecordKeeperProperties } from "../models/RecordKeeper";

var firebaseConfig = {
  apiKey: "AIzaSyBAkMD__bZ0zMsBkM8Qbag9Z0CiWMxq35Q",
  authDomain: "urbanfarmer-c46e0.firebaseapp.com",
  databaseURL: "https://urbanfarmer-c46e0.firebaseio.com",
  projectId: "urbanfarmer-c46e0",
  storageBucket: "urbanfarmer-c46e0.appspot.com",
  messagingSenderId: "374488641283",
  appId: "1:374488641283:web:5ef1c90fdceb1576784336"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const IndexPage = () => {
  const [recordDays, setRecprdDays] = React.useState<RecordKeeperProperties[]>([]);

  React.useEffect(() => {
    getRecordDays();
  }, []);  
  
  if (!recordDays.length) return <h1>Loading...</h1>
  
  return (
  <Layout>
    <SEO title="Home" />
    <CurrentTempHum record={recordDays[0]}  />
    <TempHumGraph records={recordDays} />
  </Layout>
  );

  async function getRecordDays() {
    const recordDays = await firebase.firestore()
    .collection("test")
    .orderBy("createdAt", "desc")
    .limit(1)
    .get()
    .then(snap => {
      if (snap.empty) return [];
      const arr = [];
      snap.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        arr.push(data);
      })
      return arr;
    })
    setRecprdDays(recordDays);
  }
}

export default IndexPage
