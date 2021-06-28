import React, { useState, useEffect, useContext } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import "./MainChat.css";
import { AttachFile, Call, SearchOutlined } from '@material-ui/icons';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import Button from '@material-ui/core/Button';
import {useParams} from 'react-router-dom';
import db from '../firebase';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import firebase from "firebase";
// import CallApp from './App/App';
import {userName} from './UTILS';
// import { useStateValue } from '../StateProvider';
import { StateContext } from '../StateProvider';

// const ROOMID = "AnshikaKaRoom";

function Chat({name}) {
    const [input, setInput]=useState("");
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    // props / URL 
    const [roomName, setRoomName] =useState("");
    const userName1 = name;  
    const [messages, setMessages]= useState([]);

    const {video, toggleVideo} = useContext(StateContext);

    console.log("chatvideo" + video);

    console.log("RoomID", roomId);

    var i = 1;
    console.log("NAAM", name, userName);


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
    const [rrrr] = useCollectionData(roomies, { idField: 'id' });
    // var arr = [];
    // if(rrrr){rrrr.forEach(function(item){
    //     // item.id -> room ids
    //     arr.append(item.id);
    // })}

    
    // const roomsRefs = roomies.doc(`${item.id}`)
    // const messagesRefs = roomsRefs.collection("messages");
    // const querys = messagesRefs.orderBy('time',"asc");
    // const [messags] = useCollectionData(querys, { idField: 'id' });
    // console.log(messags);

    //
    /// GET MESSAGES FROM A ROOM
    const roomsRef = roomies.doc(`${roomId}`)
    const messagesRef = roomsRef.collection("messages");
    const query = messagesRef.orderBy('time',"asc");
    const [messag] = useCollectionData(query, { idField: 'id' });

    // const [roomi] = useCollectionData(roomsRef, {id: 'id'});
    console.log("rrr", messag);
    const userscoll = db.collection("users");
    const [uuuu]= useCollectionData(userscoll, { idField: 'id' });

    console.log("uuu", uuuu);
    console.log("RoomsRef", roomsRef);


    if(uuuu){uuuu.forEach(function(item){
        console.log("KK:", item.name);

        // {item.rooms.map((r) => {
        //     return (
        //     <div className={styles.card}>
        //          <Card 
        //             onClick={() => props.history.push(`/liveChat/${r}`)} link => /:roomID 
        //             className={styles.cardbody}>
        //             <div className={styles.cardHead}>
        //                 <h2>Room Number: <span className={styles.roomNum}>{r}</span></h2>
        //             </div>
        //         </Card>
        //     </div>
        // )})}
        item.rooms.forEach(function(it){
            console.log("->", it);
        })
    })}
  
    // uuser.roooms
    // arr = []


    // ROOMS -> ROOMIDS ; USER KE ROOMS KE ARRAY SE



    var citiesRef = db.collection("Views");

    // const toggleView = (e) => {

    //     citiesRef.doc("VideoCall").set({
    //         open: true
    //     });

    //     // window.location.reload();

    // }

    var docRef = db.collection("rooms").doc(`${roomId}`);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setRoomName(doc.data().title);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


    // useEffect(() => {
    //     roomsRef.get().then((snap) => {console.log("S:",snap.data());});
    // }, [roomsRef]);
 

    // // const [ { user }, dispatch ] =useStateValue();

    // // //console.log("UUU", user);

    // const logOut = (e) => {
    //     e.preventDefault();
    //     localStorage.clear();
    //     window.location.href="/login";
    // }

    // useEffect( ()=> {
    //  if(roomId){
    //      db.collection("rooms").doc(roomId).onSnapshot( snapshot => (
    //          setRoomName(snapshot.data().title)
    //      ))
    //      db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot( snapshot =>(
    //          setMessages(snapshot.docs.map((doc) => doc.data())))
    //      );
    //  }
    //  //console.log(messages)
    // //  //console.log(db.collection('rooms').doc(roomId).collection("messages"));
    // }, [roomId]);

    // useEffect( () => {
    //     setSeed(Math.floor(Math.random() * 5000));
    //     }, [roomId]);

    // const sendMessage= (e) => {
    //     e.preventDefault();
    //     //console.log("You typed >>>", input);
    //     db.collection('rooms').doc(roomId).collection('messages').add({
    //        message: input,
    //         name: user.displayName,
    //         timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //     });

    //     setInput("");
    // };

    return (
        <>
        {citiesRef ? <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
    
            <div className="chat_headerInfo">
                <h3>{roomName}</h3>
                {/* <p>Last seen{" "}
                {new Date(
                    messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p> */}
            </div>
                <div className="chat_headerRight">
                    <VideocamRoundedIcon onClick={toggleVideo}/>
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
        </div>:<></>}
        </>
    )
//
}

export default Chat;
