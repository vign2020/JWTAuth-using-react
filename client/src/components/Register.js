import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'; // If you're using Axios
import { useNavigate, Link } from "react-router-dom"


export default function Register(props) {

    
  const history=useNavigate(props);

  const [email,setEmail]=useState('');
  const [name , setName]=useState('');
  const [password,setPassword]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {name,email,password})

      if(response.status === 200) history("/login" , {state:{id:email}} )

    } catch (error) {
      console.error('Error registering user:', error);
    }
  };




  return (
    <div>
    <div class="container">
 <form class="login-form" action="POST">
  <h2>Register</h2>

  <div class="form-group">
    <label for="name">UserName:</label>
    <input type="text" id="name" name="name" placeholder="Enter your name" onChange={(e) => {setName(e.target.value)} }/>
  </div>

  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Enter your email" onChange=  { (e) => setEmail(e.target.value)}/>
  </div>

  <div class="form-group">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter your password"   onChange={(e)=> {setPassword(e.target.value) }}/>
  </div>
  <button type="submit" onClick={handleSubmit}>Sign Up</button>
     </form>
    </div> 

    <h1>{props.state}</h1>
</div>
  )
}
