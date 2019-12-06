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
  const [records, setRecords] = React.useState<RecordKeeperProperties[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    getTempAndHum();    
  }, []);  

  if (!records.length) return <h1>Loading...</h1>

  console.log(records);
  
  return (
  <Layout>
    <SEO title="Home" />
    <h3>Sup Bee!</h3>
    <CurrentTempHum record={records[records.length - 1]}  />
    <TempHumGraph records={records} />
  </Layout>
  );

  async function getTempAndHum() {
    await firebase.firestore()
    .collection("test")
    .orderBy("createdAt", "desc")
    .get()
    .then(resp => {
      const recs: RecordKeeperProperties[] = [];
      resp.forEach(doc => {

        const data = doc.data();
        recs.push(data as RecordKeeperProperties);
        console.log(data);
        
      });
      setRecords(recs);
      setLoading(false);
    })
  }
}

export default IndexPage
