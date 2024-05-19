import React from "react";
import './Footer.css';
import { useState } from "react";

const Footer=({ socket })=>{
//get the username using the current webpage url
const URL=window.location.href;
const username=URL.split("/")[5];

//get the roomID using the current webpage url
const roomID=URL.split("/")[6];

const [message,setMessage]=useState("");
const sendMessage=(e)=>{
    e.preventDefault();
    message.trim()
    socket.emit('newMessage',{text: message, name: username, id: `${socket.id}${Math.random()}`, roomID: roomID});
    
    setMessage("");
}

return(
    <div className="footer-container">
        <form className="send-message" onSubmit={sendMessage}>
            <input className="message-field" type="text" placeholder="Enter message here..." value={message} onChange={(e)=>setMessage(e.target.value)} />
            <input className='send' type="submit" value="SEND" />
        </form>
    </div>
)
}

export default Footer;