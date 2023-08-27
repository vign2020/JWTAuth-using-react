import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'; // If you're using Axios
import { useNavigate, Link } from "react-router-dom"
import { useCookies } from 'react-cookie'



export default function Login() {

    const history=useNavigate();
    const [email , setEmail]=useState('')
    const [password , setPassword]=useState('');
    const [ cookies, setCookie, removeCookie] = useCookies(null)


    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/login', {
            email, password
          });
          
      
          if (response.status === 200) {
  
            history("/home" , {state:{id:email}})
            setCookie('AuthToken', response.data.token)
            console.log(response.data)
            // alert('logged in ')
    
          } else if (response.status === 401) {
            // Authentication failed
            alert('Authentication failed');
          
          }
    
        } catch (error) {
          // alert('Error logging in:', error);
          // console.log('error: in in '+ error)
          alert('email or password is wrong!! try again!')
        }
       
      };
    
  return (
    <div class="container" >
    <form class="login-form" action='POST'>
      <h2>Login</h2>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"/>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
      </div>
      <button type="submit" onClick={handleSubmit} >Login</button>
    </form>
    </div>

  )
}
