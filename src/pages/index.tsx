import React from "react"
import { Link } from "gatsby"
import * as firebase from "firebase";
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import * as Moment from "moment";

const firebaseConfig = {
  apiKey: "AIzaSyBAkMD__bZ0zMsBkM8Qbag9Z0CiWMxq35Q",
  authDomain: "urbanfarmer-c46e0.firebaseapp.com",
  databaseURL: "https://urbanfarmer-c46e0.firebaseio.com",
  projectId: "urbanfarmer-c46e0",
  storageBucket: "urbanfarmer-c46e0.appspot.com",
  messagingSenderId: "374488641283",
  appId: "1:374488641283:web:60d0da10cea5b24d784336"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const IndexPage = () => {
  // const [tempHum, setTempHum] = React.useState<any>({});
  const [latest, setLatest] = React.useState({});
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    getTempAndHum();    
  }, [])

  return (
  <Layout>
    <SEO title="Home" />
    <h3>Sup Bee!</h3>
    <h3>Heres the current temp and humidity: </h3>
    <h1>Temp: {convertToF(latest["temp"])}F Hum: {latest["humidity"]}%</h1>
    <h2>Updated: {Moment(time).fromNow()}</h2>
    <h4><em>This is updated every 5 minutes</em></h4>
  </Layout>
  );

  function convertToF(C) {
    return (C * 9/5) + 32;
  }

  function getTempAndHum() {
    firebase.firestore()
    .collection("test")
    .orderBy("uploadedAt")
    .get()
    .then(resp =>{
      resp.forEach(doc => {
        const data = doc.data();
        const latest = data.last;
        // setTempHum(data.records);
        setLatest(data.records[latest]);

        setTime(latest * 1);
      })
    })
  }
}

export default IndexPage
