// 1. 
// Get user 

import { VideoCall } from "@material-ui/icons"
import api from "../api"
import Chat from "./Chat/Chat"

// 2. Get All rooms of that user 

// 3. Store all those room ids 

// 4. use those ids everywhere and update it

// same name not alloweed

// USER :
    // Name
    // Rooms ARRAY 
    // UID 



// Call btn -> VideoCall.js 

// LogOut btn -> Chat.js 

// <button onClick = {<Chat />} />


// 1. Context api

// 2. PROPS 

//TODOS
//Create a prompt in which user have to enter the room name, set that room name
//new room create on click videocall button -> api call
//store in firebase



// HELLOO?
// localhost:300/rooms
    // -> all available room cards 
//localhost:3000/rooms/:roomID
    // -> messages 
    // (Go back) 


function Rooms(props) {
    // THIS VARIABLE STORES ROOM IDS THAT THE CODE EXPECTS FROM BACKEND
    const room_ids = ["123456", "12367", "123698"]; 
    // const username = "u2";

    return (<>
        <div className={styles.list}>
            {room_ids.map((r) => {
                return (
                <div className={styles.card}>
                     <Card 
                        onClick={() => props.history.push(`/liveChat/${r}`)}
                        className={styles.cardbody}>
                        <div className={styles.cardHead}>
                            <h2>Room Number: <span className={styles.roomNum}>{r}</span></h2>
                        </div>
                    </Card>
                </div>
            )})}
        </div>
        <AddRoom />
        </>
    )
};

async function getComments() {

    console.log("GET Comment!", url2);

    axios.get(`${baseUrl}/post/comments?userName=alpha&postId=1`, {headers:{"Content-Type" : "application/json"}}) 
    .then(function(response){
        setComments(response.data);
        setLoading(false);
        console.log(response);
    })
    .catch(function(error){console.log("E", error)})

}
useEffect(() =>{
    console.log("GETTING COMMENTS");
    getComments();
}, [])


// 1 -> Room ? startJoining : createRoom -> startJoining 