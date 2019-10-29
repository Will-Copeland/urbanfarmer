import React from "react"
import * as firebase from "firebase";
import Layout from "../components/layout"
import SEO from "../components/seo"
import CurrentTempHum from "../components/CurrentTempHum";
import TempHumGraph from "../components/TempHumGraph";

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
  const [tempHum, setTempHum] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    getTempAndHum();    
  }, []);  

  if (loading) return <h1>Loading...</h1>

  return (
  <Layout>
    <SEO title="Home" />
    <h3>Sup Bee!</h3>
    <CurrentTempHum currentTempData={tempHum[tempHum.length - 1]}  />
    <TempHumGraph records={tempHum} />
  </Layout>
  );

  async function getTempAndHum() {
    await firebase.firestore()
    .collection("test")
    .orderBy("uploadedAt")
    .get()
    .then(resp =>{
      const arr = [];
      resp.forEach(doc => {
        const data = doc.data();
        arr.push(data);
      });
      setTempHum(arr);
      setLoading(false);
    })
  }
}

export default IndexPage
