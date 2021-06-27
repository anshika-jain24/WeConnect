import React, {useState,useContext} from 'react'
import { StateProvider} from './StateProvider';
import MainApp from './MainApp'

function MainMainApp() {

    // var docRef = db.collection("Views").doc("VideoCall");
    // const [videodata,setVideoData] = useState();
    // // var chatRef=db.collection("Views").doc("ChatWindow");
    // // const [chatdata,setChatData] = useState()
    // console.log("yfgdkhnsdrg");
    // docRef.get().then((doc) => {
    //     if (doc.exists) {
    //         // console.log("Document data:", doc.data());
    //         setVideoData(doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });
    
    // chatRef.get().then((doc) => {
    //     if (doc.exists) {
    //         // console.log("Document data:", doc.data());
    //         setChatData(doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });

    // useEffect(() => {
    //     window.location.reload();
    // }, [docRef])

    // console.log(videodata);
    // console.log(chatdata);

    return (
        
        <StateProvider>
        <>
        {/* {console.log("video" + video)} */}
        {/* { video ? <CallApp/>:<App/>} */}
        <MainApp/>
        </>
        </StateProvider>
    )
}

export default MainMainApp
