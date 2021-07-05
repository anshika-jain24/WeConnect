import React, {useState} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/MainChat';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import CallApp from './components/CallApp/CallApp';
import Login from './components/Login';

import db from './firebase';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase'



const auth = firebase.auth();
const firestore = firebase.firestore();

var NAME = "";

function App() {
  

  const [user] = useAuthState(auth);
  if(user){
    NAME=user.displayName;
  }

  return(
    <Router>
      <Switch>
      <Route exact path="/">
          
          <section>
            <div className="app">
            {!user ? <Login/>: 
              <div className="app_body">
                <Sidebar name={NAME} user={user}/>
                <Chat name={NAME} />
              </div>}
            </div>
          </section>
        </Route>
        <Route exact path="/chat">
           
          <section>
            <div className="app">
              
              {!user ? <Login />:<>
                <div className="app_body">
                <Sidebar name={NAME} user={user}/>
                <Chat name={NAME} />
              </div></>}
            </div>
          </section>
        </Route>
        <Route exact path="/chat/rooms/:roomId">
          
          <section>
            <div className="app">
            {!user ? <Login />:
              <div className="app_body">
                <Sidebar name={NAME} user={user} />
                <Chat name={NAME} />
              </div>}
            </div>
          </section>
        </Route>
        <Route exact path="/video">
        <section>
            
          {!user ? <div className="app"><Login />
            </div>:
          <CallApp name={NAME} />}
          
          </section>
        </Route>
      </Switch>
    </Router>

);
}
  
export default App;


