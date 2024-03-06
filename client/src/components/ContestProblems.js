import React, { useEffect } from 'react'
import ProblemName from './ProblemName'
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import axios from 'axios'
import { useCookies } from 'react-cookie'

export default function ContestProblems(props) {
    const problem_name = props.name
    const [code , setCode] = useState(undefined);
    const [desc , setDesc] = useState(undefined);
    const [testcase , setTestcase] = useState(undefined);
    const [submissionId , setSubmissionId] = useState(undefined)
    const [codeoutput , setOutput]= useState(undefined); 
    const [codeoutputExpected , setcodeoutputExpected]= useState(undefined);
    // const [processing , setProcessing] = useState(false);

    const [cookies] = useCookies(['CurrentUser']);

    const [curr_user , setcurr_user] = useState(cookies.CurrentUser)

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // console.log(code)
        setOutput('Processing .....')
        try{
            const result = await axios.post("http://localhost:5000/contest_problem_code" , {code , problem_name , curr_user})
            // console.log(result)
            if(result.data.status === 401) setOutput('Error : No code has been entered ')
            console.log('submission id is   ' +result.data.submissionId)
            setSubmissionId(result.data.submissionId)
        }
        catch(e){
            console.log(e)
        }

    }
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
            const result = await axios.post("http://localhost:5000/contest_problem_info" , {problem_name})
            setDesc(result.data.description)
            setTestcase(result.data.testcases)

            console.log(result.data.description)
            console.log(result.data.testcases)
            }
            catch(e){
                console.log(e)
            }
        }
        fetchData();
    },[])



    useEffect(() => {
      console.log('fetching the output ...');
  
      const fetchData = async () => {
        try {
          const response = await axios.post("http://localhost:5000/get_output", { submission_id: submissionId });
  
          if (response.status === 200) {
            console.log(response.data.output);
            setOutput(response.data.output);
            setcodeoutputExpected(response.data.expected)
            clearInterval(intervalId)
          } else {
            // Handle other valid responses if needed
            console.log('Received an unexpected status code:', response.status);
          }
        } catch (error) {
          console.log(error);
  
          if (error.response && error.response.status === 404) {
            console.log('Result not found, continuing polling...');
          } else {
            console.log('Error occurred, stopping polling:', error.message);
            clearInterval(intervalId);
          }
        }
      };
  
      const pollingInterval = 2000; // Set the interval in milliseconds
      const intervalId = setInterval(fetchData, pollingInterval);
   
      
  
      // Cleanup function to clear the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
    }, [submissionId]);
    


  return (
    <div>

        <div className="show-contest-container">
            <h1>{problem_name}</h1>
            
            {!desc ? 'loading' : <h5>{desc}</h5>}
            <h2>Sample Input and output : </h2>
            {   
                testcase ? testcase.map((item , index)=>(
                    <>
                             <h3>{item.input}</h3>
                    <h3>{item.output}</h3>
                    </>
               
                    ))
           
                :
                <h4>please wait... loading ... </h4>
            }

        </div>
        ContestProblems
        

        <form  className="form-container">
         
     
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

           <h1 className='codeEditor'><code>{codeoutput}</code></h1>
           

    </div>
  )
}
