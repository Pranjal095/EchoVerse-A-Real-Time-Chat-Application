import React from 'react';
import "./LoggedUser.css";
import Sidebar1 from './Sidebar1.js';
import Body1 from './Body1.js';
import useWindowDimensions from '../useWindowDimensionsHook';

const LoggedUser=({ socket })=>{
  const windowWidth = useWindowDimensions()["width"];
  
  return(
    <div className='app-container'>
        {/*Adding responsiveness for mobile devices*/}
        {windowWidth<768 ? 
          null :
          <Sidebar1 />
        }
        <div className='parent-container'>
          <Body1 socket={ socket } />
        </div>
    </div>
  )
}

export default LoggedUser;