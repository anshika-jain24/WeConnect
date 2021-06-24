import React, { useEffect, useState } from 'react';
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from '../firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from "react-router-dom";

function SidebarChat({addNewChat, id , name, message}) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages]= useState([]);

    useEffect(() => {
        console.log(messages[0])
    },[messages])


    const addMessage = (obj) => {
        setMessages([...messages, {
            id:obj.id,
            text:obj.text,
            sender:obj.sender,
            time:obj.time
        }])
    }
    // console.log(id);

    // db.collection("rooms").doc(id).collection("messages").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // });

    useEffect(() =>{
        if(id) {
            // db.collection('rooms')
            // .doc(id)
            // .collection('messages')
            // .orderBy('timestamp', 'desc')
            // .onSnapshot( (snapshot) => 
            //     setMessages(snapshot.docs.map( (doc) =>
            //     doc.data()))
                
            // );
            db.collection('rooms').doc(id).onSnapshot((doc) => {
                console.log(doc.data());
            })
        }
    }, [id]);

    // useEffect(() =>{
    //     if(id) {
    //         // db.collection('rooms')
    //         // .doc(id)
    //         // .collection('messages')
    //         // .orderBy('timestamp', 'desc')
    //         // .then((querySnapshot) => {
    //         //     querySnapshot.forEach((doc) => {
    //         //         // doc.data() is never undefined for query doc snapshots
    //         //         console.log(doc.id, " => " , doc.data());
    //         //     });
    //         // });
    //         db.collection("rooms").doc(id).collection("messages").get().then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 // doc.data() is never undefined for query doc snapshots
    //                 // const t=messages;
    //                 // t.push(doc.data());
    //                 // console.log(t.length);
    //                 // setMessages(t);
    //                 // setMessages(messages.concat([doc.data()]))
    //                 const obj=doc.data();
    //                 console.log(obj.sender);
    //                 addMessage(obj);
    //                 // console.log(doc.data());
    //                 // let arr = messages;
    //                 // arr.push(doc.data());
    //                 // console.log(arr);
    //                 // setMessages(arr)
    //                 // console.log(doc.id, " => ", [doc.data()]);
    //             });
    //         });
    //         // .onSnapshot( (snapshot) => 
    //         //     setMessages(snapshot.docs.map( (doc) =>
    //         //     doc.data()))
                
    //         // );
    //     }
    //     // console.log(messages);
    //     // console.log(db.collection('rooms').doc(id).snapshot);
    // }, [id]);

    useEffect( () => {
        setSeed(Math.floor(Math.random() * 5000));
        }, []);

    const createChat = () =>{
        const roomName= prompt("Please enter name for chat");

        if(roomName){
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };

    return  !addNewChat ? (
        <Link to={`/rooms/${id}`} >
        <div className="sidebarChat">
           <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
           <div className="sidebarChat_info">
            <h2>{name}</h2>
               {/* <p>{messages.length > 0 ? messages[0].text:""}</p> */}
               {messages.length > 1 ? <p>{messages[0].text}</p>:<></>}
               {console.log(messages)}
               {console.log(messages.length)}
           </div>
        </div>
        </Link>
    ): (
        // <></>
      <div className="sidebarChatNew">
          <AddCircleIcon onClick={createChat} style={{fontSize:'5.188rem', color: 'white'}} />
          {/* <p className="add__chat">Add new chat</p> */}
      </div>
    );
}

export default SidebarChat
