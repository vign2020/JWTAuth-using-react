import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    
    <div className="Landing">
  
  <header className="hero">
    <h1>Welcome to Code-Crunch</h1>
    <p>Sharpen your coding skills and become a better developer.</p>

    <div className="button-container">
      
        <Link to={"/login"}>
        <button className="login-button">
          Login
        </button>
        </Link>

        <Link to={"/register"}>
        <button className="signup-button">
          SignUp
        </button>
        </Link>

    </div>


  </header>
    </div>
  )
}
