import React from 'react';
import './Sidebar.css' 
import SidebarChat from './SidebarChat';
import db from '../firebase'
import Button from '@material-ui/core/Button';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


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


    return(
        <div className="sidebar">
         <div className="sidebar_name">
             <Avatar className={classes.purple} src={user.photoURL}>{name.charAt(0).toUpperCase()}</Avatar>
             <p style={{paddingLeft: '0.6rem'}}>{name}</p>
             <Button style={{marginLeft: '9rem'}} color="inherit" onClick={() => auth.signOut()}><ExitToAppIcon/></Button>
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