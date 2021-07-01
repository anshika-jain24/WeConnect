import React, { useEffect, useState } from 'react';
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from '../firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from "react-router-dom";
import AddRoom from './AddRoom';
// impoer AddRoom

function SidebarChat({addNewChat, id , name}) {
    const [seed, setSeed] = useState('');
    // const [messages, setMessages]= useState([]);

    // //console.log(id);

    // db.collection("rooms").doc(id).collection("messages").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         //console.log(doc.id, " => ", doc.data());
    //     });
    // });
    // const userName1= "Ansj";

    console.log("id", id);
    const roomsRef = db.collection("rooms").doc(`${id}`);
    const messagesRef = roomsRef.collection("messages");
    const query = messagesRef.orderBy('time',"desc");
    const [messag] = useCollectionData(query, { idField: 'id' });
    // const [rrrr] = useCollectionData(roomies, { idField: 'id' });


    // useEffect(() => {
    //     roomsRef.get().then((snap) => {//console.log("S:",snap.data());});
    // }, [])
    
    // //console.log(rrrr);
    //console.log(roomsRef);

    // useEffect(() =>{
    //     if(id) {
    //         // db.collection('rooms')
    //         // .doc(id)
    //         // .collection('messages')
    //         // .orderBy('timestamp', 'desc')
    //         // .onSnapshot( (snapshot) => 
    //         //     setMessages(snapshot.docs.map( (doc) =>
    //         //     doc.data()))
                
    //         // );
    //         db.collection('rooms').doc(id).onSnapshot((doc) => {
    //             //console.log(doc.data());
    //         })
    //     }
    // }, [id]);

    // useEffect(() =>{
    //     if(id) {
    //         // db.collection('rooms')
    //         // .doc(id)
    //         // .collection('messages')
    //         // .orderBy('timestamp', 'desc')
    //         // .then((querySnapshot) => {
    //         //     querySnapshot.forEach((doc) => {
    //         //         // doc.data() is never undefined for query doc snapshots
    //         //         //console.log(doc.id, " => " , doc.data());
    //         //     });
    //         // });
    //         db.collection("rooms").doc(id).collection("messages").get().then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 // doc.data() is never undefined for query doc snapshots
    //                 // const t=messages;
    //                 // t.push(doc.data());
    //                 // //console.log(t.length);
    //                 // setMessages(t);
    //                 // setMessages(messages.concat([doc.data()]))
    //                 const obj=doc.data();
    //                 //console.log(obj.sender);
    //                 addMessage(obj);
    //                 // //console.log(doc.data());
    //                 // let arr = messages;
    //                 // arr.push(doc.data());
    //                 // //console.log(arr);
    //                 // setMessages(arr)
    //                 // //console.log(doc.id, " => ", [doc.data()]);
    //             });
    //         });
    //         // .onSnapshot( (snapshot) => 
    //         //     setMessages(snapshot.docs.map( (doc) =>
    //         //     doc.data()))
                
    //         // );
    //     }
    //     // //console.log(messages);
    //     // //console.log(db.collection('rooms').doc(id).snapshot);
    // }, [id]);

    useEffect( () => {
        setSeed(Math.floor(Math.random() * 5000));
        }, []);

    // const createChat = () =>{
    //     const roomName= prompt("Please enter name for chat");

    //     if(roomName){
    //         db.collection('rooms').add({
    //             title: roomName,
    //             users: [userName1]
    //         });
    //     }
    // };

    // function AddRoom() {

    //     function AddRoomToFirebase() {
    
    //         //console.log("CALLED ADD_ROOM_TO_FIREBASE!");
    
    //         // var SOS_ID = Math.floor(100000 + Math.random() * 900000);
    //         const responser = "u2";
    //         const sender = "u3";
    //         const users = [`${responser}`, `${sender}`];
    
    //         db.collection("rooms").doc(`123`).set({
    //             users: users,
    //         })
    //         .then(() => {
    //             //console.log("New Room Created!");
    //         })
    //         .catch((error) => {
    //             console.error("Error writing document: ", error);
    //         });
        
    //     };
    
    //     //console.log("CONNECTING TO ROOMS!");
    //     const messagesRef = db.collection("rooms");
    //     const query = messagesRef; 
    //     const [room] = useCollectionData(query, { idField: 'id' });
    //     //console.log("ROOMS: ", room);
    
    //     // return(
    //     //     <>
    //     //         <button onClick={AddRoomToFirebase} className={styles.AddRoom}>Add Room</button>
    //     //     </>
    //     // )
    
    // }

    return  !addNewChat ? (
        <Link to={`/chat/rooms/${id}`} >
        <div className="sidebarChat">
           <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
           <div className="sidebarChat_info">
            <h2>{name}</h2>
               {/* <p>{messages.length > 0 ? messages[0].text:""}</p> */}
               {messag && messag.length > 1 ? <p>{messag[0].text}</p>:<></>}
               {/* {//console.log(messages)}
               {//console.log(messages.length)} */}
           </div>
        </div>
        </Link>
    ): (
        <AddRoom />
        // <></>
    //   <div className="sidebarChatNew">
    //       <AddCircleIcon onClick={} style={{fontSize:'5.188rem', color: 'white'}} />
    //       {/* <p className="add__chat">Add new chat</p> */}
    //   </div>
    );
}

export default SidebarChat









