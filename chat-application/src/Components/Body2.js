import React from "react";
import './Body2.css';
import { useNavigate } from 'react-router-dom';

const Body1=({ messages, socket, roomname })=>{
  //get the username using the current webpage url
  const URL=window.location.href;
  const username=URL.split("/")[5];
  
  const navigate=useNavigate();

  //get the roomID using the current webpage url
  const roomID=URL.split("/")[6];

  const leaveChat=()=>{
    socket.emit('leaveResponse');
    navigate("/loggedin/"+username);
  }

  return(
    <div className='body-container'>
      <header className='room-header'>
          <p>{roomname}: {roomID}</p>
          <button className='leave-chat' onClick={leaveChat}>
              LEAVE CHAT
          </button>
      </header>

      <div className="all-chats">

        {messages.map((message=>message["name"]===username ? (
        <div className='chat-container' key={message["id"]}>
            <p className='sender-name1'>You</p>
            <div className='message-sent'>
                <p>{message["text"]}</p>
            </div>
        </div>
        ) : (
          <div className='chat-container' key={message["id"]}>
            <p className="sender-name2">{message["name"]}</p>
            <div className='message-received'>
                <p>{message["text"]}</p>
            </div>
        </div>
        )))}
      </div>
    </div>
  )
}

export default Body1;