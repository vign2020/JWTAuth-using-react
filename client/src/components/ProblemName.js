import React from 'react'
import data from '../data/data';
import { useState } from 'react';
import axios from 'axios'

export default function ProblemName(props) {
    const problem_tags=data[1];


    const [code , setCode]=useState('');
    const [answer , setAnswer]=useState('');
    const [executionTime , setexecutionTime]=useState(null);
    const [success , setsuccess]=useState(undefined);
    const [Go , setGo]=useState(null);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setGo(true)
        console.log('success'+ success)
    
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
    <div className='ProblemName-container'>

      <div className="ProblemDescription">
        <h1>{props.problem_name}</h1>
        {problem_tags
          .filter((item, index) => item.name === props.problem_name)
          .map((item, index) => (
            <p key={index}>{item.problem_desc}</p>
          ))}
      </div>

      <div className="CodeEditor-container">
        <h1>Code Editor</h1>
        <form action="POST" className="form-container">
          <textarea
            rows="20"
            cols="75"
            value={code}
            className="textarea"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></textarea><br />
          <button
            type="submit"
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit
          </button>
        </form>
        <div className={`code-output-container ${Go ? "code-output-container-true" : "code-output-container-false"}`}>
          <h1 className={`code-header ${success ? 'code-header-success' : 'code-header-fail'}`}>
            {success ? 'Success' : 'Fail'}
          </h1>
          {executionTime && (
            <p className="execution-time">
              Execution Time: {executionTime} ms
            </p>
          )}
          <pre className="code-output">
            {answer}
          </pre>
        </div>
      </div>

    </div>
    

  )
}
