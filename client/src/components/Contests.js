import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"


import { useCookies } from 'react-cookie'


export default function Contests() {
    const [contesttitle , setContest] = useState(undefined);
    const [contestId , setContestId] = useState(undefined);
    const [showcontest , setShowContest] = useState(undefined)

    const [cookies] = useCookies(['CurrentUser']);
    // const curr_user = cookies.CurrentUser;
    const [curr_user , setcurr_user] = useState(cookies.CurrentUser)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get("http://localhost:5000/contest");
            // console.log(result.data.contest);  // Assuming result is an Axios response object with data property
            setContest(result.data.contest)
            setContestId(result.data.id)
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);

      const handleClick = async()=>{
        try{
            const result = await axios.post('http://localhost:5000/contest_insert_user' , { curr_user , contestId})
            setShowContest(result.data.message);
        }
        catch(e){
            console.log(e)
        }
      }

  return (
    <div>
        <div className="contests-container">
    
                <h1>{contesttitle}</h1>
            
               <button className="register-contest" onClick={handleClick}> Register </button>
               
               {
                showcontest  ? 
              <div>
                  <h1> {showcontest} </h1> 
                  <button>
                    <Link to={`/contests/contestId?contestId=${contestId}`}>Click me</Link>
                  </button>
                </div> 
                :
                ''

              }
              
        </div>
    </div>
  )
}
