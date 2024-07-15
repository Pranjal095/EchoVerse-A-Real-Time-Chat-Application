import React from 'react';
import './ChangeProfile.css';
import { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../useWindowDimensionsHook';
import { decryptText } from '../HelperFunctions';

const ChangeProfile=({ socket })=>{
  const windowWidth = useWindowDimensions()["width"];
  //get the username using the current webpage url
  const URL = window.location.href;
  const encryptedUsername = URL.split("/")[4]
  const username = decryptText(encryptedUsername);

  const navigate = useNavigate();

  const [originalPassword,setOriginalPassword] = useState("");
  const [type,setType] = useState('password');
  const [icon,setIcon] = useState(eyeOff);
  const [password1,setPassword1] = useState("");
  const [type1,setType1] = useState('password');
  const [icon1,setIcon1] = useState(eyeOff);
  const [password2,setPassword2] = useState("");
  const [type2,setType2] = useState('password');
  const [icon2,setIcon2] = useState(eyeOff);

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
      socket.emit('changePassword',{ username: username, originalPassword: originalPassword, newPassword: password1 });
      
      await socket.on('changeResponse',(data)=>{
        if(data["error"]){
          navigate("/error");
          socket.emit('error',data["error"]);
        }
        else navigate("/"+encryptedUsername);
      })
    }
  }

  return(
    <div className='change-container'>
      <h1 className='app-title'>EchoVerse</h1>
      <form className='form' onSubmit={formSubmit}>
      <fieldset className='input-field'>
        <legend>Change Password</legend>
        <span className='profile-username'>USERNAME: {username}</span>
        <br />
        <br />
        <label className='password-label' htmlFor='original-password'>ORIGINAL PASSWORD</label>
        {/*adding responsiveness for mobile devices*/}
        {
          windowWidth<768 ? 
          <br /> :
          null
        }
        <input className='password-input' id='original-password' type={type} name='original-password' placeholder='Enter your original password here...' onChange={(e) => setOriginalPassword(e.target.value)} value={originalPassword} />
        <span onClick={toggle}>
          <Icon className="icon" icon={icon} size={22}/>
        </span>
        <br />
        <br /> 
        <label className='password-label' htmlFor='new-password'>NEW PASSWORD</label>
        {/*adding responsiveness for mobile devices*/}
        {
          windowWidth<768 ? 
          <br /> :
          null
        }
        <input className='password-input' id='new-password' type={type1} name='new-password' placeholder='Enter your new password here...' onChange={(e) => setPassword1(e.target.value)} value={password1} />
        <span onClick={toggle1}>
          <Icon className="icon" icon={icon1} size={22}/>
        </span>
        <br />
        <br /> 
        <label htmlFor='re-password'>RE-ENTER NEW PASSWORD:</label>
        {/*adding responsiveness for mobile devices*/}
        {
          windowWidth<768 ? 
          <br /> :
          null
        }
        <input className='password-input' id='re-password' type={type2} placeholder='Re-enter the password...' onChange={(e) => setPassword2(e.target.value)} value={password2} />
        <span onClick={toggle2}>
          <Icon className="icon" icon={icon2} size={22}/>
        </span>
        <br />
        <br />
        <br />
        <input className='submit' type="submit" value="CHANGE" />
      </fieldset>
      </form>
    </div>
  )
}

export default ChangeProfile;      