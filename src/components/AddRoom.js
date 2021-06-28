import React from "react";
import  db  from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";
import firebase from "firebase/app";
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import styles from "./LiveRooms.module.css";
const ROOMID = "AnshikaKaRoom";
function AddRoom() {

    function AddRoomToFirebase() {

        //console.log("CALLED ADD_ROOM_TO_FIREBASE!");

        // var SOS_ID = Math.floor(100000 + Math.random() * 900000);
        const roomName= prompt("Please enter name for chat");
        console.log("roomName", roomName);
        const responser = "u2";
        const sender = "u3";
        const users = [`${responser}`, `${sender}`];

        db.collection("rooms").add({
            time: firebase.firestore.FieldValue.serverTimestamp(),
            title: roomName,
            users: users,
        })
        .then(() => {
            //console.log("New Room Created!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    
    };

    //console.log("CONNECTING TO ROOMS!");
    const messagesRef = db.collection("rooms");
    const query = messagesRef; 
    const [room] = useCollectionData(query, { idField: 'id' });
    //console.log("ROOMS: ", room);

    return(
        <>
         <div className="sidebarChatNew">
          <AddCircleIcon onClick={AddRoomToFirebase} style={{fontSize:'5.188rem', color: 'white'}} />
         </div>
            {/* <button onClick={AddRoomToFirebase}>Add Room</button> */}
        </>
    )

}

export default AddRoom;