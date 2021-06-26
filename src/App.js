import React, {useState} from 'react';
import './App.css';
import Login from './components/Login'
import Sidebar from './components/Sidebar';
import Chat from './components/MainChat';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import db from './firebase';
// import {useState} from 'react-hooks';
import {useStateValue} from "./StateProvider"

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
  // console.log("USER: ", use);

  return(
    <section>
      <div className="app">
      {/* { !user ? ( */}
      { !user ? 
        <SignIn />:
        <div className="app_body">
      <Router>
        <Sidebar />
        <Switch>
           <Route path="/rooms/:roomId">
             < Chat name={NAME} />
          </Route>

          <Route path="/">
            <Chat name={NAME} />
          </Route>
        </Switch>
        
      </Router>
      </div>}
    </div>
    </section>
);
}
  // const creds=localStorage.getItem('uid');

  // return (
    

  //     {/* ) : (
  //     <div className="app_body">
  //     <Router>
  //       <Sidebar />
  //       <Switch>
  //          <Route path="/rooms/:roomId">
  //            < Chat />
  //         </Route>

  //         <Route path="/">
  //           <Chat />
  //         </Route>
  //       </Switch>
        
  //     </Router>
  //   </div>
  //     )
  //   } */}
  // </div>
  // );
  
//   const [{user},dispatch] = useStateValue();

//   const creds=localStorage.getItem('uid');
//   admin.auth().getUser(creds)
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     //console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//   })
//   .catch((error) => {
//     //console.log('Error fetching user data:', error);
//   });

//   //console.log(creds);
//   //console.log("IU:", user);

//   return (
//     <div className="app">
//       { creds === null ? (
//         <Login />
//       ) : (
//       <div className="app_body">
//       <Router>
//         <Sidebar />
//         <Switch>
//            <Route exact path="/rooms/:roomId">
//              < Chat />
//           </Route>

//           <Route exact path="/">
//             <Chat />
//           </Route>
//         </Switch>
        
//       </Router>
//     </div>
//       )
//     }
//   </div>
//   );
// }

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
    const [rrrr]= useCollectionData(userscoll, { idField: 'id' });
  
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
    console.log("Users collection 1", rrrr);
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
    // store it in UTILS  
  }else{
    console.log("user already present")
    // const userscoll = db.collection("users");
    console.log("Users collection", rrrr);
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

// function ChatR(){
//   //console.log("roomieeee");
//   return (
//     <h1>HOLA!</h1>
//   )
// }


function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


export default App;
