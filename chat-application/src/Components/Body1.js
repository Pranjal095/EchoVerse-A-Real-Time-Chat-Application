import React from "react";
import './Body1.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useWindowDimensions from "../useWindowDimensionsHook";
import { decryptText } from "../HelperFunctions";

const Body1=({ socket })=>{
  const windowWidth = useWindowDimensions()["width"];

  //get the username using the current webpage url
  const URL = window.location.href;
  const encryptedUsername = URL.split("/")[4];
  const username = decryptText(encryptedUsername);
  
  const navigate = useNavigate();
  
  const [roomname,setRoomname] = useState("");
  const [roomID,setRoomID] = useState("");

  const logoutApp=()=>{
    navigate("/");
  }

  //creating a room with ID = uppercase of socket.id
  const formSubmit1=(e)=>{
    e.preventDefault();
    socket.emit('newRoom',{ roomID: socket.id.toUpperCase(), roomname: roomname, username: username, socketID: socket.id });

    navigate("/"+encryptedUsername+"/"+socket.id.toUpperCase());
  }

  const formSubmit2=(e)=>{
    e.preventDefault();
    socket.emit('joinRoom',{ roomID: roomID, username: username, socketID: socket.id });

    navigate("/"+encryptedUsername+"/"+roomID);
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
        <form className='room-form' onSubmit={formSubmit1}>
          <fieldset className='room-field'>
              <legend>Create EchoRoom</legend>
              <br />
              <label className='room-label' htmlFor='room-name'>ECHOROOM NAME</label>
              {/*adding responsiveness for mobile devices*/}
              {
                windowWidth<768 ? 
                <br /> :
                null
              }
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
          <form className='room-form' onSubmit={formSubmit2}>
          <fieldset className='room-field'>
              <legend>Join EchoRoom</legend>
              <br />
              <label className='room-label' htmlFor='room-ID'>ECHOROOM ID</label>
              {/*adding responsiveness for mobile devices*/}
              {
                windowWidth<768 ? 
                <br /> :
                null
              }
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

export default Body1;