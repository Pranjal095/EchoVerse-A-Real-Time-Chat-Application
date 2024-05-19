import React from 'react';
import "./LoggedUser.css";
import Sidebar1 from './Sidebar1.js';
import Body1 from './Body1.js';

const LoggedUser=({ socket })=>{
  return(
    <div className='app-container'>
        <Sidebar1 />
        <div className='parent-container'>
          <Body1 socket={ socket } />
        </div>
    </div>
  )
}

export default LoggedUser;