import React from 'react';
import Welcome from '../images/Welcome-1.jpg';
import './Greetings.css';

function Greetings() {
    return (
        <div className="hello">
            <h1>Click on the chat to start chatting</h1>
            <img style={{ maxWidth: '100%', height : '700px', marginLeft: '4rem'}} src={Welcome}/>
        </div>
    )
}

export default Greetings
