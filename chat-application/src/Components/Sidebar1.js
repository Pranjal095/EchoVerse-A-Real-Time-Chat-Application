import React from "react";
import './Sidebar1.css';
import userIcon from '../user-icon.jpg'
import { Link } from 'react-router-dom'

const Sidebar1=()=>{
	//get the username using the current webpage url
  const URL=window.location.href;
  const username=URL.split("/")[5];

	return(
		<div className="sidebar-container">
      <h1 className="app-name">EchoVerse</h1>
      <h3 className="sidebar-heading">{username}</h3>
      <h3 className="profile-heading">Profile</h3>
      <div className="change-profile">
        <img className='user-icon' src={userIcon} alt='User Icon' />
        <p><Link to={`/loggedin/${username}/changeprofile`}>Change Profile</Link></p>
      </div>
    </div>
	)
}

export default Sidebar1;