import React, { useState } from 'react'
import axios from 'axios'

export default function DockerNode() {

    const [code ,setCode ] = useState('');

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
    
          const result = await axios.post('http://localhost:5000/execute',{
            code
          })
          // setAnswer(result.response.data)
  
          
        }
        catch(e){
          console.log(e.response.data)
        }
       
      
    
    
      }

  return (
    <div>

<form action="POST" class="form-container">
              <textarea
                rows="20"
                cols="75"
                value={code}
                class="textarea"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              ></textarea>
              <button
                type="submit"
                onClick={handleSubmit}
                class="submit-button"
              >
                Submit
              </button>
            </form>

    </div>
  )
}
