import React, { useEffect, useState } from 'react';
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from '../firebase';
import Button from '@material-ui/core/Button';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from "react-router-dom";
import AddRoom from './AddRoom';
// impoer AddRoom

function SidebarChat({addNewChat, id , name}) {
    const [seed, setSeed] = useState('');

    const roomsRef = db.collection("rooms").doc(`${id}`);
    const messagesRef = roomsRef.collection("messages");
    const query = messagesRef.orderBy('time',"desc");
    const [messag] = useCollectionData(query, { idField: 'id' });


    useEffect( () => {
        setSeed(Math.floor(Math.random() * 5000));
        }, []);



    return  !addNewChat ? (
        <Link to={`/chat/rooms/${id}`} >
        <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
           <div className="sidebarChat_info">
               
            <h2>{name}</h2>
               {messag && messag.length > 0 ? <p>{messag[0].text}</p>:<></>}
           </div>
        </div>
        </Link>
    ): (
        <AddRoom />
    );
}

export default SidebarChat









