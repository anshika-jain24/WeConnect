import React, {useState, useEffect} from 'react';
import './Sidebar.css' 
import SidebarChat from './SidebarChat';
import db from '../firebase'
// import { useStateValue } from '../StateProvider';
import Rooms from '../mockdata/rooms.json';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function Sidebar() {
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
         <div className="sidebar_search">
             <div className="sidebar_searchContainer">
                <input placeholder="Search" type="text" />
             </div>
         </div>
         <div className="sidebar_chats">
             
             {
                 roomData ? roomData.map(room => (
                    //  if(room.id is present in user ka rooms ka array)
                     <SidebarChat key={room.id} id={room.id} name={room.title} />
                 )):<></>
             }
             {/* {
                 Rooms.map((roomSingle) => {
                     return(
                        <SidebarChat key={roomSingle.id}  id={roomSingle.id} name={roomSingle.name} message={roomSingle.messages[0]}/>
                     )
                 })
             } */}
             <SidebarChat  addNewChat/>
         </div>
         
        </div>

    );
}

export default Sidebar