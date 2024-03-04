import React, { useEffect } from 'react'
import data from '../data/data';
import { useState } from 'react';
import axios from 'axios'


// import Editor from 'react-simple-code-editor';
import Editor from '@monaco-editor/react';
import { highlight, languages } from "prismjs/components/prism-core";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

export default function ProblemName(props) {
    const problem_tags=data[1];


    const [code , setCode]=useState('');
    const [answer , setAnswer]=useState('');
    const [executionTime , setexecutionTime]=useState(null);
    const [success , setsuccess]=useState(undefined);
    const [Go , setGo]=useState(null);
    // const [testcase , setTestcase] = useState([]);
    const [actualCode , setactualCode] = useState('');
    const [expected , setExpected] = useState(undefined);
    const [verdict , setVerdict] = useState(undefined);
    const [call , setCall] = useState(undefined);
    const [create , setCreate]= useState(undefined);
    const [input , setInput] = useState(undefined);

    const [codemain , setCodemain] = useState(undefined)
    const [callmain , setCallmain] = useState(undefined);
   

    const problem_name = props.problem_name;

    useEffect(()=>{

      const selectedItem = problem_tags.find((item) => item.name === problem_name);

      if (selectedItem) {
        setCall(selectedItem.call);
        setCallmain(selectedItem.callmain);
        setCodemain(selectedItem.codemain);
      }

    },[problem_name])

     

    
  
const handleSubmit=async (e)=>{
  // await ProblemFunc();
  
        e.preventDefault();
        setGo(true)
        setsuccess('processing')
        setVerdict(undefined)
        
       

        try{
          
          // setAnswer(result.response.data)
          // setAnswer(result.data.op)
          // setexecutionTime(result.data.executionTime)
          // setsuccess(result.data.success)
          // setExpected(result.data.expected)
          // console.log(`the states are ::: ${call} and ${codemain} and ${callmain}`);
          const result = await axios.post('http://localhost:5000/code' , {code , call , callmain , codemain})

          // console.log(`${result.data.op}` )
          setsuccess(result.data.status);
           setAnswer(result.data.op)
           setVerdict(result.data.op)

          console.log(verdict)
          setexecutionTime(result.data.executionTime)

          


          // setResult(result.data.result)
          // setInput(result.data.input)
        }
        catch(e){
          console.error(e)
        }
        
    }


  return (
    <div className='ProblemName-container'>

      <div className="ProblemDescription">
        <h1>{props.problem_name}</h1>
        {problem_tags
          .filter((item, index) => item.name === props.problem_name)
          .map((item, index) => {
           
            return(
              <>
            <p key={index}>{item.problem_desc}</p>
            </>
            )
            
           
              })
          }


          </div>

      

     
     
      <div className="CodeEditor-container">
        <h1>Code Editor</h1>
        <form action="POST" className="form-container">
         
     
      <Editor 
        height ="70vh"
        width = "100%"
        theme="vs-dark"
        defaultLanguage='cpp'
        value={code}
        onChange={(code)=>{ setCode(code)}}
      />

          <button
            type="submit"
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit
          </button>
        </form>
        <div className={`code-output-container ${Go ? "code-output-container-true" : "code-output-container-false"}`}>
          <h1 className={`code-header ${success === true ? 'code-header-success' : (success === 'processing' ? 'code-header-processing' : 'code-header-fail')}`}>
            {success === true ? 'Compilation Success' : (success === 'processing' ? 'Processing...' : 'Compilation Fail')}
           
          </h1>  
          <h1 className={`${verdict === "correct" ? 'code-header-success' :  'code-header-fail'}`}>
            {/* { verdict === "correct" ? 'Correct answer' : (verdict === undefined ? '' : 'Wrong answer') } */}
            {verdict}
           
          </h1>
          {executionTime && (
            <p className="execution-time">
              Execution Time: {executionTime} ms
            </p>
          )}
          <h4>Your input</h4>
          <pre className='code-output'>
            {input!== undefined ? `[${input.join(' , ')}]` : 'cant read input'}
          </pre>
          <h4>Your output</h4>
          <pre className="code-output">
            {answer}
          </pre>
          <h4>expected output</h4>
          <pre className="code-output">
            {expected!==undefined ? expected : 'null'}
          </pre>
        </div>
      </div>

    </div>
    

  )
}
