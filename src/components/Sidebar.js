import React, {useState, useEffect} from 'react';
import './Sidebar.css' 
import SidebarChat from './SidebarChat';
import db from '../firebase'
// import { useStateValue } from '../StateProvider';
import Rooms from '../mockdata/rooms.json';

function Sidebar() {
    const [ rooms, setRooms ] = useState([]);
    // const [{user, dispacth}] = useStateValue();
    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => 
        setRooms(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
           )
        );

    }, []);

    return(
        <div className="sidebar">
         <div className="sidebar_search">
             <div className="sidebar_searchContainer">
                <input placeholder="Search" type="text" />
             </div>
         </div>
         <div className="sidebar_chats">
             
             {
                 rooms.map(room => (
                     <SidebarChat key={room.id} id={room.id} name={room.data.title} />
                 ))
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