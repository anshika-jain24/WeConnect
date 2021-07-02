import React, {useState, useEffect} from 'react';
import './Sidebar.css' 
import SidebarChat from './SidebarChat';
import db from '../firebase'
import Button from '@material-ui/core/Button';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';

const auth = firebase.auth();

function Sidebar({name}) {

    console.log("Sidebar Name", name);
    const [ rooms, setRooms ] = useState([]);
    // const [{user, dispacth}] = useStateValue();
    // useEffect(() => {
    //     db.collection('rooms').onSnapshot(snapshot => 
    //     setRooms(
    //         snapshot.docs.map(doc => ({
    //             id: doc.id,
    //             data: doc.data(),
    //         }))
    //        )
    //     );

    // }, []);

    const roomies = db.collection("rooms");
    const [roomData]=useCollectionData(roomies, {idField: 'id'});

    //console.log(roomies);
    //console.log("Room data", roomData);

    return(
        <div className="sidebar">
         <div className="sidebar_name">
             <p>Welcome, {name}</p>
             <Button color="inherit" onClick={() => auth.signOut()}>LogOut</Button>
         </div>
         <div className="sidebar_chats">
             {
                 roomData ? roomData.map(room => (
                    //  if(room.id is present in user ka rooms ka array)
                     <SidebarChat key={room.id} id={room.id} name={room.title} />
                 )):<></>
             }
             <SidebarChat  addNewChat/>
         </div>
         
        </div>

    );
}

export default Sidebar