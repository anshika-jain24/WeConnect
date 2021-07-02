import React, {useState} from 'react';
import './App.css';
import Login from './components/Login'
import Sidebar from './components/Sidebar';
import Chat from './components/MainChat';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import CallApp from './components/CallApp/CallApp';

import db from './firebase';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase'



const auth = firebase.auth();
const firestore = firebase.firestore();

var NAME = "";

function App() {

  // const [{user},dispatch] = useStateValue();
  

  const [user] = useAuthState(auth);


  return(
    <Router>
      <Switch>
      <Route exact path="/">
          
          <section>
            <div className="app">
            {!user ? <SignIn/>: 
              <div className="app_body">
                <Sidebar name={NAME} />
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
                <Sidebar name={NAME} />
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
                <Sidebar name={NAME} />
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

);
}
  

function SignIn() {
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

    // console.log("uuu", uuuu);
  
   

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
  }else{
    console.log("user already present")
    console.log("Users collection", uuuu);
    
  }}




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


