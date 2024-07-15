import React from "react";
import './Body2.css';
import { useNavigate } from 'react-router-dom';
import { decryptText } from "../HelperFunctions";

const Body2=({ messages, socket, roomname })=>{
  //get the username using the current webpage url
  const URL = window.location.href;
  const encryptedUsername = URL.split("/")[4]
  const username = decryptText(encryptedUsername);
  
  const navigate = useNavigate();

  //get the roomID using the current webpage url
  const roomID = URL.split("/")[5];

  const leaveChat=()=>{
    socket.emit('leaveResponse');
    navigate("/"+encryptedUsername);
  }

  return(
    <div className='body-container'>
      <header className='room-header'>
          <p>{roomname}: {roomID}</p>
          <button className='leave-chat' onClick={leaveChat}>
              LEAVE
          </button>
      </header>

      <div className="all-chats">
        {messages.map((message=>message["name"]===username ? 
        (
        <div className='chat-container' key={message["id"]}>
            <p className='sender-name1'>You</p>
            <div className='message-sent'>
              {/*decrypt the ciphertext before displaying*/}
                <p>{decryptText(message["text"])}</p>
            </div>
        </div>
        ) : 
        (
          <div className='chat-container' key={message["id"]}>
            <p className="sender-name2">{message["name"]}</p>
            <div className='message-received'>
              {/*decrypt the ciphertext before displaying*/}
                <p>{decryptText(message["text"])}</p>
            </div>
        </div>
        )))}
      </div>
    </div>
  )
}

export default Body2;