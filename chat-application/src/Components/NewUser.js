import React from 'react';
import './Login.css';
import { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from 'react-router-dom';

const NewUser=({ socket })=>{
  const navigate=useNavigate();

  const [username,setUsername]=useState("");
  const [password1,setPassword1]=useState("");
  const [type1,setType1]=useState('password');
  const [icon1,setIcon1]=useState(eyeOff);
  const [password2,setPassword2]=useState("");
  const [type2,setType2]=useState('password');
  const [icon2,setIcon2]=useState(eyeOff);

  const toggle1=()=>{
    if(type1==='password'){
      setIcon1(eye);
      setType1('text');
    }
    else{
      setIcon1(eyeOff);
      setType1('password');
    }
  }

  const toggle2=()=>{
    if(type2==='password'){
      setIcon2(eye);
      setType2('text');
    }
    else{
      setIcon2(eyeOff);
      setType2('password');
    }
  }

  const confirmPassword=()=>{
    if(password1!==password2){
      alert("Ensure that the same password is entered in both fields.");
      return false;
    }
    return true;
  }

  const formSubmit=async(e)=>{
    e.preventDefault();
    if(confirmPassword()){
      socket.emit('newUser',{ username: username, password: password1 });
      
      await socket.on('loginResponse',(data)=>{
        if(data["error"]){
          navigate("/error");
          socket.emit('error',data["error"]);
        }
        else navigate("/loggedin/"+username);
      })
    }
  }

  return(
    <div className='container'>
      <h1 className='app-title'>EchoVerse</h1>
      <form className='form' onSubmit={formSubmit}>
      <fieldset className='input-field'>
        <legend>New User</legend>
        <label htmlFor='user-name'>USERNAME: </label>
        <input className='input' id='user-name' type='text' name='username' placeholder='Enter your username here...' onChange={(e) => setUsername(e.target.value)} value={username} />
        <br />
        <br />
        <label className='password-label' htmlFor='password'>PASSWORD: </label>
        <input className='input' id='password' type={type1} name='password' placeholder='Enter your password here...' onChange={(e) => setPassword1(e.target.value)} value={password1} />
        <span onClick={toggle1}>
          <Icon className="icon" icon={icon1} size={22}/>
        </span>
        <br />
        <br /> 
        <label htmlFor='re-password'>RE-ENTER PASSWORD:</label>
        <input className='input' id='re-password' type={type2} placeholder='Re-enter the password...' onChange={(e) => setPassword2(e.target.value)} value={password2} />
        <span onClick={toggle2}>
          <Icon className="icon" icon={icon2} size={22}/>
        </span>
        <br />
        <br />
        <br />
        <input className='submit' type="submit" value="SIGNUP" />
      </fieldset>
      </form>
    </div>
  )
}

export default NewUser;