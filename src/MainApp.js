import React, {useState,useContext} from 'react'
import App from './App';
import CallApp from './components/CallApp/CallApp';
import {StateContext} from './StateProvider';
import ButtonAppBar from './components/Navbar';
// import db from 

function MainApp() {

    const {video,setVideo}= useContext(StateContext);


    return (
        <>
        <ButtonAppBar />
        { video ? <CallApp />:<App/>}
        </>
    )
}

export default MainApp
