import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDwG9zCaY_t3H8oBnmLdnro24FOfK2tBf0",
    authDomain: "weconnect-21295.firebaseapp.com",
    projectId: "weconnect-21295",
    storageBucket: "weconnect-21295.appspot.com",
    messagingSenderId: "580642898899",
    appId: "1:580642898899:web:94955ef28075edc9d4e526",
    measurementId: "G-1TFWW1D51T"
    // databaseURL: "https://chatify-e98ae.firebaseio.com",
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider} ;
  export default db;