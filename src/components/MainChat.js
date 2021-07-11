import React, { useState} from 'react';
import "./MainChat.css";
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import Button from '@material-ui/core/Button';
import {useParams} from 'react-router-dom';
import db from '../firebase';
import { useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from "firebase";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';


function Chat({name}) {
    const [input, setInput]=useState("");
   
    const { roomId } = useParams();
    // props / URL 
    const [roomName, setRoomName] =useState("");
    const [roomUrl,setRoomUrl]=useState("");
    const userName1 = name;  


    const goToVideo = (e) => {
        e.preventDefault();
        window.location.href=`/video/${roomId}?roomUrl=${roomUrl}`;
    }


    function AddToFirebase(e) {
        e.preventDefault();

        db.collection("rooms").doc(`${roomId}`).collection("messages").add({
            time: firebase.firestore.FieldValue.serverTimestamp(),
            text: input,
            sender: userName1
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        setInput("");
    };
    const roomies = db.collection("rooms")


    const roomsRef = roomies.doc(`${roomId}`)
    const messagesRef = roomsRef.collection("messages");
    const query = messagesRef.orderBy('time',"asc");
    const [messag] = useCollectionData(query, { idField: 'id' });

    



    var docRef = db.collection("rooms").doc(`${roomId}`);

    docRef.get().then((doc) => {
        if (doc.exists) {
 
            setRoomName(doc.data().title);
            setRoomUrl(doc.data().roomUrl);
        } 
        else {
         console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


   


    return (
         <div className="chat">
            <div className="chat_header">
    
    
            <div className="chat_headerInfo">
                <h3><span className="brandName">WeConnect</span><span className="roomName"> | {roomName.toUpperCase()}</span></h3>
            </div>
                <div className="chat_headerRight">
                    <VideocamRoundedIcon style={{ cursor: 'pointer'}} onClick={goToVideo}/>  
                </div>
            </div>
            <div className="chat_body">
                {messag ? messag.map((message) => (
                 <p className={`chat_message ${message.sender === userName1 && `chat_receiver`}`}>
                    <span className="chat_name">{message.sender}</span>{message.text}
                    <span className="chat_timestamp">{new Date(message.time?.toDate
                    ()).toUTCString()}</span>
                </p>
                )):<></>}
            
            </div>
            <div className="chat_footer">
                {/* <span><Picker /></span> */}
              <form>
                  <input value={input} onChange={ (e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
                  <Button onClick={AddToFirebase} type="submit" disabled={input.length<1}>Send</Button>
              </form>
            </div>
        </div>
    )
//
}

export default Chat;
