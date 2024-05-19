import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReturningUser from './Components/ReturningUser.js'
import NewUser from './Components/NewUser.js';
import Error from './Components/Error.js';
import LoggedUser from './Components/LoggedUser.js';
import ChangeProfile from './Components/ChangeProfile.js';
import ChatRoom from './Components/ChatRoom.js';
import socketIO from 'socket.io-client';

const expressConnectURL="http://localhost:3001";
const socket=socketIO.connect(expressConnectURL,{
  transports: ['websocket']
});

const App=()=>{
  return(
    <Router>
      <Routes>
        <Route path='/' element={<ReturningUser socket={ socket } />} />

        <Route path='new' element={<NewUser socket={ socket } />} />

        <Route path='error' element={<Error socket={ socket } />} />

        <Route path='loggedin/:username' element={<LoggedUser socket={ socket } 
        />} />

        <Route path='loggedin/:username/changeprofile' element={<ChangeProfile socket={ socket } />} />

        <Route path='loggedin/:username/:roomID' element={<ChatRoom socket={ socket } />} />
      </Routes>
    </Router>
  )
}

export default App;
