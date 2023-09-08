import React from 'react'
import axios from 'axios'
import { useState } from 'react';
export default function CodeEditor() {

    const [code , setCode]=useState('');
    const [answer , setAnswer]=useState('');
    const [executionTime , setexecutionTime]=useState(null);
    const [success , setsuccess]=useState(null);
    
  
    const handleSubmit=async (e)=>{
      e.preventDefault();
      console.log('success'+success)
  
      try{
  
        const result = await axios.post('http://localhost:5000/code',{
          code
        })
        // setAnswer(result.response.data)
        setAnswer(result.data.op)
        setexecutionTime(result.data.executionTime)
        setsuccess(result.data.success)
        
      }
      catch(e){
        console.log(e.response.data)
      }
     
    
  
  
    }
    return (
        
          <div class="container">
            <h1>Code Editor</h1>
            
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
        
            <div class="code-output-container">
              <h1 class={`code-header ${success ? 'code-header-success' : 'code-header-fail'}`}>
              {success ? 'Success' : 'Fail'}
              </h1>
              
              {executionTime && (
                <p class="execution-time">
                  Execution Time: {executionTime} ms
                </p>
              )}
        
              <pre class="code-output">
                {answer}
              </pre>
            </div>
          </div>
    
    )
}
