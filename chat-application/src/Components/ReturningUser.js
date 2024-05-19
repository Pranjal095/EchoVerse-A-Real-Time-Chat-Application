import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

const ReturningUser=({ socket })=>{
  const navigate=useNavigate();

  const [username,setUsername]=useState("");
  const [password,setPassword] = useState("");
  const [type,setType] = useState('password');
  const [icon,setIcon] = useState(eyeOff);

  const toggle=()=>{
    if(type==='password'){
      setIcon(eye);
      setType('text');
    }
    else{
      setIcon(eyeOff);
      setType('password');
    }
  }

  const formSubmit=async(e)=>{
    e.preventDefault();
    socket.emit('userLogin',{ username: username, password: password });

    await socket.on('loginResponse',(data)=>{
      if(data["error"]){
        navigate("/error");
        socket.emit('error',data["error"]);
      }
      else navigate("/loggedin/"+username);
    })
  }

  return(
    <div className='container'>
      <h1 className='app-title'>EchoVerse</h1>
      <form className='form' onSubmit={formSubmit}>
      <fieldset className='input-field'>
        <legend>User Login</legend>
        <label htmlFor='user-name'>USERNAME: </label>
        <input className='input' id='user-name' type='text' name='username' placeholder='Enter username here...' onChange={(e)=>setUsername(e.target.value)} value={username} />
        <br />
        <br />
        <label className='password-label' htmlFor='password'>PASSWORD: </label>
        <input className='input' id='password' type={type} name='password' placeholder='Enter password here...' onChange={(e) => setPassword(e.target.value)} value={password} />
        <span onClick={toggle}>
            <Icon className="icon" icon={icon} size={22}/>
        </span>
        <br />
        <br />
        <br />
        <input className='submit' type="submit" value="LOGIN" />
        <br />
        <br />
        <p className='new-user'>New User? <Link to="new">Click here</Link></p>
      </fieldset>
      </form>
    </div>
  )
}

export default ReturningUser;      