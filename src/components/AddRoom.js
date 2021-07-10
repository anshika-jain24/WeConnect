import React from "react";
import  db  from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";
import firebase from "firebase/app";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import api from '../api';
// const ROOMID = "AnshikaKaRoom";
function AddRoom() {

    function AddRoomToFirebase() {
;
        const roomName= prompt("Please enter name for chat");
        if(roomName && roomName!== "" )
        {
            var roomU = `https://hellotesting.daily.co/${roomName}`;        
            api
            .createRoom(roomName)
            .then((room) => {console.log("ROOM URL: %s \n RoomU: %s", roomU, room.url)})
            .catch((error) => {
            console.log('Error creating room', error);
            });


            const responser = "u2";
            const sender = "u3";
            const users = [`${responser}`, `${sender}`];

            db.collection("rooms").add({
                time: firebase.firestore.FieldValue.serverTimestamp(),
                title: roomName,
                users: users,
                roomUrl: roomU, 
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
        else
        {
            alert("Empty room");
        }
    
    };


    const messagesRef = db.collection("rooms");
    const query = messagesRef; 
    const [room] = useCollectionData(query, { idField: 'id' });
    //console.log("ROOMS: ", room);

    return(
        <>
         <div className="sidebarChatNew">
          <AddCircleIcon onClick={AddRoomToFirebase} style={{fontSize:'5.188rem', color: 'white'}} />
         </div>
        </>
    )

}

export default AddRoom;