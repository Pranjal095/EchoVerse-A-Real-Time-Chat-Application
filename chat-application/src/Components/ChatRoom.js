import React from 'react';
import "./ChatRoom.css";
import Sidebar2 from './Sidebar2.js';
import Body2 from './Body2.js';
import Footer from './Footer.js';
import { useState,useEffect } from 'react';
import useWindowDimensions from '../useWindowDimensionsHook';

const ChatRoom=({ socket })=>{
  const windowWidth = useWindowDimensions()["width"];

  //get the roomID using the current webpage url
  const URL = window.location.href;
  const roomID = URL.split("/")[5];

  const [messages,setMessages] = useState([]);
  const [roomname,setRoomname] = useState("");

  useEffect(()=>{
    socket.on('joinResponse',(data)=>{
      setMessages(data["messages"]);
      setRoomname(data["roomname"]);
    },[socket,messages])
  });

  useEffect(()=>{
    socket.on('messageResponse',(data)=>{
      if(data["roomID"]===roomID){   //add a message to EchoRoom only if roomID is a match
        setMessages([...messages,data])
      }
    })
  },[socket,messages,roomID])

  return(
    <div className='app-container'>
        {/*Adding responsiveness for mobile devices*/}
        {windowWidth<768 ? 
          null :
          <Sidebar2 socket={ socket } />
        }
        <div className='parent-container'>
          <Body2 messages={ messages } socket={ socket } roomname={ roomname }/>
          <Footer socket={ socket } />
        </div>
    </div>
  )
}

export default ChatRoom;