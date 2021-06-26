import React, {useState,useEffect} from 'react'
import db from './firebase';
import App from './App';
import CallApp from '../src/components/App/App';
import { Call } from '@material-ui/icons';

function MainApp() {

    var docRef = db.collection("Views").doc("VideoCall");
    const [videodata,setVideoData] = useState();
    // var chatRef=db.collection("Views").doc("ChatWindow");
    // const [chatdata,setChatData] = useState();

    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            setVideoData(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
    // chatRef.get().then((doc) => {
    //     if (doc.exists) {
    //         // console.log("Document data:", doc.data());
    //         setChatData(doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });

    // useEffect(() => {
    //     window.location.reload();
    // }, [docRef])

    // console.log(videodata);
    // console.log(chatdata);

    return (<>
        {videodata && videodata.open ? <CallApp/>:<App/>}
        </>
    )
}

export default MainApp
