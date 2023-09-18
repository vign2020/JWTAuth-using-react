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
    const [testcase , setTestcase] = useState([]);
    const [actualCode , setactualCode] = useState('');
    const [expected , setExpected] = useState(undefined);
    const [result , setResult] = useState(undefined);
    const [call , setCall] = useState(undefined);
    const [create , setCreate]= useState(undefined);
    const [input , setInput] = useState(undefined);
   

    const problem_name = props.problem_name;


    const handleSubmit=async (e)=>{
        e.preventDefault();
        setGo(true)
        setsuccess('processing')
        setResult(undefined)
 
      console.log(testcase)
     
        try{
    
          const result = await axios.post('http://localhost:5000/code',{
            code , call , create
          })
          // setAnswer(result.response.data)
          setAnswer(result.data.op)
          setexecutionTime(result.data.executionTime)
          setsuccess(result.data.success)
          setExpected(result.data.expected)
          setResult(result.data.result)
          setInput(result.data.input)
        }
        catch(e){
          console.log(e.response.data)
        }
    }

    const TestCase = async(e)=>{
      // console.log('problem name is' + problem_tags[0].testcase[1].array);
      const problem_name = problem_tags.filter((item , index) =>{
        return item.name === props.problem_name
      })
      setTestcase(problem_name[0].testcase);
      setactualCode(problem_name[0].code);
      setCall(problem_name[0].call);
      setCreate(problem_name[0].create);

      console.log(actualCode)

      const resp = axios.post('http://localhost:5000/code-testcase',{ testcase , actualCode })

    }
    useEffect(()=>{
      TestCase();
    },[testcase])
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

<div className="testcase-container">
{testcase.map((testcase, index) => (
        <div key={index} className="example">
          <h3>Example {index + 1}:</h3>
          <p>
        <strong>Input:</strong> nums = [{testcase.array.join(', ')}]
        {testcase.target ? <span> target = {testcase.target}</span> : ''}
      </p>
          {/* <p><strong>Output:</strong> [{testcase.output.join(', ')}]</p> */}
          {testcase.explanation && (
            <p><strong>Explanation:</strong> {testcase.explanation}</p>
          )}
        </div>
      ))}
      </div>
          </div>

      

     
     
      <div className="CodeEditor-container">
        <h1>Code Editor</h1>
        <form action="POST" className="form-container">
          {/* <textarea
            rows="20"
            cols="75"
            value={code}
            className="textarea"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></textarea><br /> */}
          {/* <Editor
      value={code}
      padding={20}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => highlight(code, languages.js)}
      style={{
        fontFamily: "monospace",
        fontSize: 17,
        border: "1px solid black"
      }}
    /> */}
     
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
          <h1 className={`code-header ${result === 'correct answer' ? 'code-header-success' :  'code-header-fail'}`}>
            {result === 'correct answer' ? 'Correct answer' : (result === undefined ? '' : 'Wrong answer')}
           
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
