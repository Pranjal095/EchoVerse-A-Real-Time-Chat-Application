import React from "react";
import './Footer.css';
import { useState } from "react";
import { encryptText,decryptText } from "../HelperFunctions";

const Footer=({ socket })=>{
//get the username using the current webpage url
const URL = window.location.href;
const username = decryptText(URL.split("/")[4]);

//get the roomID using the current webpage url
const roomID = URL.split("/")[5];

const [message,setMessage] = useState("");
const sendMessage=(e)=>{
    e.preventDefault();
    message.trim()
    //encrypt the message before sending to server
    socket.emit('newMessage',{ text: encryptText(message), name: username, id: `${socket.id}${Math.random()}`, roomID: roomID});
    
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