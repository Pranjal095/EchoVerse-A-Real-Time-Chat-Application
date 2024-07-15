import React from "react";
import './Sidebar2.css';
import { useState,useEffect } from 'react';
import { decryptText } from "../HelperFunctions";

const Sidebar2=({ socket })=>{
  let [users,setUsers]=useState([]);

  useEffect(()=>{
    socket.on('memberResponse',(data)=>setUsers(data));
  },[socket,users]);

  //get the username and roomID using the current webpage url
  const URL = window.location.href;
  const username = decryptText(URL.split("/")[4]);
  const roomID = URL.split("/")[5];

  //access only those users which are in the same group
  users=users.filter((user)=>user["roomID"] === roomID);

  return(
    <div className="sidebar-container">
      <h1 className="app-name">EchoVerse</h1>
      <h3 className="sidebar-heading">{username}</h3>
      <h3 className="online-heading">Members Online:</h3>
      <div className="online-members">
        {users.map((user)=>(
          <p key={user["socketID"]}>{user["username"]}</p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar2;