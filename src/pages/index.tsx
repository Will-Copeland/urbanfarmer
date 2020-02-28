import React from "react"
import Layout from "../components/layout"
import firebase, { firestore } from "firebase";
import SEO from "../components/seo"
import CurrentTempHum from "../components/CurrentTempHum";
import TempHumGraph from "../components/TempHumGraph";
import { RecordKeeperProperties } from "../models/RecordKeeper";
import { DeHumidifier } from "../components/DeHumidifer";

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
  const [recordDays, setRecordDays] = React.useState<RecordKeeperProperties[]>([]);

  React.useEffect(subscribeToRecords, []);

  console.log(recordDays);

  if (!recordDays.length) return <h1>Loading...</h1>


  return (
  <Layout>
    <SEO title="Home" />
    <DeHumidifier record={recordDays[0]} />
    <CurrentTempHum record={!!recordDays[0].tempData ? recordDays[0] : recordDays[1]}  />
    <TempHumGraph records={!!recordDays[0].tempData ? [recordDays[0]] : [recordDays[1]]} />
  </Layout>
  );



  function subscribeToRecords() {
    return firestore().collection("test")
    .orderBy("createdAt", "desc")
    .onSnapshot(snap => {
      const arr = [];
      snap.forEach(doc => {
        const data = doc.data();
        data.docID = doc.id;
        arr.push(data);
      });
      setRecordDays(arr);
    })
  }
}

export default IndexPage
