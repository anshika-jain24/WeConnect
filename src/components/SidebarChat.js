import React, { useEffect, useState } from 'react';
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from '../firebase';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from "react-router-dom";
import AddRoom from './AddRoom';
// impoer AddRoom

const useStyles = makeStyles((theme) => ({
    purple: {
      backgroundColor: '#086dd8',
    }
  }));

function SidebarChat({addNewChat, id , name}) {
    
    const classes= useStyles();
    const [seed, setSeed] = useState('');

    const roomsRef = db.collection("rooms").doc(`${id}`);
    const messagesRef = roomsRef.collection("messages");
    const query = messagesRef.orderBy('time',"desc");
    const [messag] = useCollectionData(query, { idField: 'id' });


    useEffect( () => {
        setSeed(Math.floor(Math.random() * 5000));
        }, []);

        // console.log(name);

    return  !addNewChat ? (
        <Link to={`/chat/rooms/${id}`} >
        <div className="sidebarChat">
        <Avatar className={classes.purple}>{name.charAt(0).toUpperCase()}</Avatar>
           <div className="sidebarChat_info">
               
            <h2>{name.toUpperCase()}</h2>
               {messag && messag.length > 0 ? <p>{messag[0].text}</p>:<></>}
           </div>
        </div>
        </Link>
    ): (
        <AddRoom />
    );
}

export default SidebarChat









