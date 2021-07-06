import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CallObjectContext from '../../CallObjectContext';
import './Chat.css';
import db from '../../firebase';
import firebase from 'firebase';

export default function Chat(props) {
  const callObject = useContext(CallObjectContext);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const R=useParams();

  const roomId=R.roomId;

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    callObject.sendAppMessage({ message: inputValue }, '*');
    const name = props.name;
    setChatHistory([
      ...chatHistory,
      {
        sender: name,
        message: inputValue,
      },
    ]);

    db.collection("rooms").doc(`${roomId}`).collection("messages").add({
      time: firebase.firestore.FieldValue.serverTimestamp(),
      text: inputValue,
      sender: name
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

    setInputValue('');
  }

  /**
   * Update chat state based on a message received to all participants.
   *
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event) {
      const participants = callObject.participants();
      const name = participants[event.fromId].user_name
        ? participants[event.fromId].user_name
        : 'Guest';
      setChatHistory([
        ...chatHistory,
        {
          sender: name,
          message: event.data.message,
        },
      ]);
      // Make other icons light up
      props.notification();
    }

    callObject.on('app-message', handleAppMessage);

    return function cleanup() {
      callObject.off('app-message', handleAppMessage);
    };
  }, [callObject, chatHistory]);

  useEffect(() => {}, [chatHistory]);

  return props.onClickDisplay ? (
    <div className="videochat">
      <div className="chatss">
      {chatHistory.map((entry, index) => (
        <div key={`entry-${index}`} className="messageList">
          <b>{entry.sender}</b>: {entry.message}
        </div>
      ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="chatInput"></label>
        <input
          id="chatInput"
          className="videochat-input"
          type="text"
          placeholder="Type your message here.."
          value={inputValue}
          onChange={handleChange}
        ></input>
        <button type="submit" className="send-chat-button">
          Send
        </button>
      </form>
    </div>
  ) : null;
}
