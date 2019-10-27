import React from "react"
import { Link } from "gatsby"
import * as firebase from "firebase";
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

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

  React.useEffect(() => {
    getDoc();
  }, [])

  return (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
  )

  function getDoc() {
    firebase.firestore()
    .collection("test")
    .get()
    .then(resp =>{
      resp.forEach(doc => {
        console.log(doc.data());
        
      })
    })
  }
}

export default IndexPage
