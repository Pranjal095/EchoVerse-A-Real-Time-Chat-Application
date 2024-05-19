import React from "react";
import './Body1.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Body2=({ socket })=>{
  //get the username using the current webpage url
  const URL=window.location.href;
  const username=URL.split("/")[5];
  
  const navigate=useNavigate();
  
  const [roomname,setRoomname]=useState("");
  const [roomID,setRoomID]=useState("");

  const logoutApp=()=>{
    navigate("/");
  }

  //creating a room with ID = uppercase of socket.id
  const formSubmit1=(e)=>{
    e.preventDefault();
    socket.emit('newRoom',{ roomID: socket.id.toUpperCase(), roomname: roomname, username: username, socketID: socket.id });

    navigate("/loggedin/"+username+"/"+socket.id.toUpperCase());
  }

  const formSubmit2=(e)=>{
    e.preventDefault();
    socket.emit('joinRoom',{ roomID: roomID, username: username, socketID: socket.id });

    navigate("/loggedin/"+username+"/"+roomID);
  }

  return(
    <div className='body-container'>
      <header className='room-header'>
          <p>Create or Join a EchoRoom</p>
          <button className='logout-app' onClick={logoutApp}>
              LOGOUT
          </button>
      </header>

      <div className="all-forms">
      <form className='form' onSubmit={formSubmit1}>
        <fieldset className='input-field'>
            <legend>Create EchoRoom</legend>
            <br />
            <label className='room-label' htmlFor='room-name'>ECHOROOM NAME: </label>
            <input className='input-room' id='room-name' type='text' name='roomname' placeholder='Enter EchoRoom name here...' onChange={(e)=>setRoomname(e.target.value)} value={roomname} />
            <br />
            <br />
            <br />
            <input className='submit' type="submit" value="CREATE ROOM" />
        </fieldset>
        </form>

        <br />
        <br />
        <br />
        <br />

        <form className='form' onSubmit={formSubmit2}>
        <fieldset className='input-field'>
            <legend>Join EchoRoom</legend>
            <br />
            <label className='room-label' htmlFor='room-ID'>ECHOROOM ID: </label>
            <input className='input-id' id='room-ID' type='text' name='roomID' placeholder='Enter EchoRoom ID here...' onChange={(e)=>setRoomID(e.target.value)} value={roomID} />
            <br />
            <br />
            <br />
            <input className='submit' type="submit" value="JOIN ROOM" />
        </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Body2;