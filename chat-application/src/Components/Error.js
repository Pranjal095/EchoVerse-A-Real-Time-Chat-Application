import React from "react";
import './Error.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Error=({ socket })=>{
  const [errorMessage,setErrorMessage]=useState("");
  socket.on('errorResponse',(data)=>{
    setErrorMessage(data);
  })

  const navigate=useNavigate();

  const formSubmit=(e)=>{
    e.preventDefault();

    navigate("/");
  }

  return(
    <div className='container'>
      <h1 className='app-title'>EchoVerse</h1>
      <form className='form' onSubmit={formSubmit}>
      <fieldset className='input-field'>
        <legend>Error</legend>
        <h1 className="error-message">{errorMessage}</h1>
        <br />
        <br />
        <input className='submit' type="submit" value="GO BACK TO LOGIN PAGE" />
      </fieldset>
      </form>
    </div>
  )
}

export default Error;