import React, { useState } from 'react'
import axios from 'axios'


export default function Trial() {
    const [item , setItem] =useState(null)
    const get_content = async ()=>{
      try {
        const response = await fetch('http://localhost:5000/checkAuth');
        setItem(response.status);
        } 
        catch (error) {
          console.error('Error:', error);
          setItem(error.response ? error.response.status : 'Error');
        }
    }
  return (
    <div>
        <button onClick={get_content}>click me</button>
        <h1>{item}</h1>
    </div>
  )
}
