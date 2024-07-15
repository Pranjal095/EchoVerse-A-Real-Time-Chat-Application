import React from "react";
import './Sidebar1.css';
import userIcon from '../user-icon.jpg'
import { Link } from 'react-router-dom'
import { decryptText } from "../HelperFunctions";

const Sidebar1=()=>{
	//get the username using the current webpage url
  const URL = window.location.href;
  const encryptedUsername = URL.split("/")[4];
  const username = decryptText(encryptedUsername);

	return(
		<div className="sidebar-container">
      <h1 className="app-name">EchoVerse</h1>
      <h3 className="sidebar-heading">{username}</h3>
      <h3 className="profile-heading">Profile</h3>
      <div className="change-profile">
        <img className='user-icon' src={userIcon} alt='User Icon' />
        <p><Link to={`/${encryptedUsername}/changeprofile`}>Change Profile</Link></p>
      </div>
    </div>
	)
}

export default Sidebar1;