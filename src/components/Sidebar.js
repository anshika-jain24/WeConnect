import React from 'react';
import './Sidebar.css' 
import SidebarChat from './SidebarChat';
import db from '../firebase'
import Button from '@material-ui/core/Button';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';


const auth = firebase.auth();

const useStyles = makeStyles((theme) => ({
    purple: {
      backgroundColor: '#086dd8',
    }
  }));

function Sidebar({name, user}) {

    const classes= useStyles();

    const roomies = db.collection("rooms");
    const [roomData]=useCollectionData(roomies, {idField: 'id'});

    // console.log(user.photoURL);

    return(
        <div className="sidebar">
         <div className="sidebar_name">
             <Avatar className={classes.purple} src={user.photoURL}>{name.charAt(0).toUpperCase()}</Avatar>
             <p>Welcome, {name}</p>
             <Button color="inherit" onClick={() => auth.signOut()}>LogOut</Button>
         </div>
         <div className="sidebar_chats">
             {
                 roomData ? roomData.map(room => (
                     <SidebarChat key={room.id} id={room.id} name={room.title} />
                 )):<></>
             }
             <SidebarChat  addNewChat/>
         </div>
         
        </div>

    );
}

export default Sidebar