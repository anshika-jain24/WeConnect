import React, {useState,useContext} from 'react'
import App from './App';
import CallApp from './components/CallApp/CallApp';
import {StateContext} from './StateProvider';

function MainApp() {

    const {video,setVideo}= useContext(StateContext);

    return (
        <>
        { video ? <CallApp/>:<App/>}
        </>
    )
}

export default MainApp
