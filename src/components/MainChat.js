import React, { useState} from 'react';
import "./MainChat.css";
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import Button from '@material-ui/core/Button';
import {useParams} from 'react-router-dom';
import db from '../firebase';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import firebase from "firebase";

// const ROOMID = "AnshikaKaRoom";

function Chat({name}) {
    const [input, setInput]=useState("");
    // const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    // props / URL 
    const [roomName, setRoomName] =useState("");
    const [roomUrl,setRoomUrl]=useState("");
    const userName1 = name;  
    const [messages, setMessages]= useState([]);

    const goToVideo = (e) => {
        e.preventDefault();
        window.location.href=`/video?roomUrl=${roomUrl}`;
    }


    function AddToFirebase(e) {
        e.preventDefault();
        //console.log("CALLED ADDTOFIREBASE!");

        db.collection("rooms").doc(`${roomId}`).collection("messages").add({
            time: firebase.firestore.FieldValue.serverTimestamp(),
            text: input,
            sender: userName1
        })
        .then(() => {
            //console.log(`Message written inside Room Number:  successfully written!`);
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        setInput("");
    };
    const roomies = db.collection("rooms")
    // const [rrrr] = useCollectionData(roomies, { idField: 'id' });

    const roomsRef = roomies.doc(`${roomId}`)
    const messagesRef = roomsRef.collection("messages");
    const query = messagesRef.orderBy('time',"asc");
    const [messag] = useCollectionData(query, { idField: 'id' });

    
    // const userscoll = db.collection("users");
    // const [uuuu]= useCollectionData(userscoll, { idField: 'id' });




    var docRef = db.collection("rooms").doc(`${roomId}`);

    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            setRoomName(doc.data().title);
            setRoomUrl(doc.data().roomUrl);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


   


    return (
         <div className="chat">
            <div className="chat_header">
                {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}
    
            <div className="chat_headerInfo">
                <h3>{roomName}</h3>
            </div>
                <div className="chat_headerRight">
                    <VideocamRoundedIcon onClick={goToVideo}/>
                    <PhoneRoundedIcon />
                    {/* <Button onClick={logOut}>Logout</Button> */}
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
