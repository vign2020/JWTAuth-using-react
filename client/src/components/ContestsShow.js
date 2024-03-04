import React, { useEffect , useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'


export default function ContestsShow(props) {

    // console.log(props.contestId)
    // const { dynamic } = useParams();
    // const [dynamicstate , setDynamic] = useState(undefined)
    const [problems , setProblems] = useState(undefined);
    const contestId = props.contestId;
    console.log(contestId)
    
    useEffect( ()=>{
        const fetchData = async () => {
        try{
        
            const result = await axios.post('http://localhost:5000/contests_show' , {contestId});
            console.log(result.data.problems )
    
            setProblems(result.data.problems)

        }
        catch(e){
            console.log(e)
        }
    }

    fetchData(); 
        
    }, [props.contestId])

  return (
    <div>
        <h1>contestShow</h1>
        {
            problems ? 
            problems.map((item , index) =>(
                <button>
                     <h3><Link to = {`/ContestProblemName?problem=${item.title}`}>{item.title}</Link></h3>
                </button>
            ))
               
            :
            ''
        }
 

      
        </div>
  )
}
