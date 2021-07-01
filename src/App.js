import React, {useState} from 'react';
import './App.css';
import Login from './components/Login'
import Sidebar from './components/Sidebar';
import Chat from './components/MainChat';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import CallApp from './components/CallApp/CallApp';

import db from './firebase';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase'

// import { NAME, UID, usersData } from './components/UTILS';

// const firebaseConfig = {
//     apiKey: "AIzaSyDwG9zCaY_t3H8oBnmLdnro24FOfK2tBf0",
//     authDomain: "weconnect-21295.firebaseapp.com",
//     projectId: "weconnect-21295",
//     storageBucket: "weconnect-21295.appspot.com",
//     messagingSenderId: "580642898899",
//     appId: "1:580642898899:web:94955ef28075edc9d4e526",
//     measurementId: "G-1TFWW1D51T"
//     // databaseURL: "https://chatify-e98ae.firebaseio.com",
//   };

// firebase.initializeApp( firebaseConfig )

const auth = firebase.auth();
const firestore = firebase.firestore();

var NAME = "";

function App() {

  // const [{user},dispatch] = useStateValue();
  

  const [user] = useAuthState(auth);
  console.log("USER: ", user);

  return(
    <Router>
      <Switch>
      <Route exact path="/">
          
          <section>
            <div className="app">
            {!user ? <SignIn/>: 
              <div className="app_body">
                <Sidebar/>
                <Chat name={NAME} />
              </div>}
            </div>
          </section>
        </Route>
        <Route exact path="/chat">
           
          <section>
            <div className="app">
              
              {!user ? <SignIn/>:<>
                <div className="app_body">
                <Sidebar/>
                <Chat name={NAME} />
              </div></>}
            </div>
          </section>
        </Route>
        <Route exact path="/chat/rooms/:roomId">
          
          <section>
            <div className="app">
            {!user ? <SignIn/>:
              <div className="app_body">
                <Sidebar/>
                <Chat name={NAME} />
              </div>}
            </div>
          </section>
        </Route>
        <Route exact path="/video">
        <section>
            
          {!user ? <div className="app"><SignIn/>
            </div>:
          <CallApp/>}
          
          </section>
        </Route>
      </Switch>
    </Router>
    // <section>
    //   <div className="app">
    //   {/* { !user ? ( */}
    //   { !user ? 
    //     <SignIn />:
    //     <div className="app_body">
    //   <Router>
    //     <Sidebar />
    //     <Switch>
    //        <Route exact path="/chat/rooms/:roomId">
    //          <Chat name={NAME} />
    //       </Route>

    //       {/* <Route exact path="/chat/rooms">
    //         <Chat name={NAME} />
    //       </Route> */}
    //     </Switch>
        
    //   </Router>
    //   </div>}
    // </div>
    // </section>
);
}
  

function SignIn() {
  //console.log("chal jaaa");
const [use, setUse] = useState();
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider) .then(result=>{
      console.log("R: ", result.user);
      setUse(result.user);
      // window.location.href="/";
  })
  .catch((err)=>alert(err.message));
}

    auth.onAuthStateChanged(userAuth => {
        setUse(userAuth);
    });
    const userscoll = db.collection("users");
    const [uuuu]= useCollectionData(userscoll, { idField: 'id' });

    console.log("uuu", uuuu);
  
    // await function
    // await GET call
    // then context 

  if(use){
    let userData = use;
    const USERID=use.uid;
    if(userData.metadata.creationTime === userData.metadata.lastSignInTime){
      console.log("user for the first time")
      db.collection("users").doc(`${USERID}`).set({
        name: use.displayName,
        rooms: [],
  })
  .then(() => {
      //console.log("New Room Created!");
    console.log("Users collection 1", uuuu);
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
    // store it in UTILS  
  }else{
    console.log("user already present")
    // const userscoll = db.collection("users");
    console.log("Users collection", uuuu);
    // pass name / id 
    // store it in UTILS
  }}

  // console.log("UID: ", use);


  if(use){
  console.log("UIDDDD: ", use.displayName);
  NAME = use.displayName;
  // UID=use.uid;
  console.log("Mera nassme haio", NAME);
  }
  else{
    console.log("no user");
  }


  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}


function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


export default App;


// "hosting": {
//   "public": "public",
//   "ignore": [
//     "firebase.json",
//     "**/.*",
//     "**/node_modules/**"
//   ]
// },