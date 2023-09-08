import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'

export default function DiscussContent(props) {

    const [content , Setcontent]=useState([]);

    const fetch_content= async ()=>{
        try{
            const resp = await axios.post('http://localhost:5000/discuss-content' , {getContent : props.discuss})
            Setcontent(resp.data.userContent);
            console.log(`resp data is ${resp.data.userContent}`)
        }catch(e){
            console.log(e)
        }
       
    }
    useEffect(()=>{
        fetch_content();
    },[])

    console.log(`content is ${content}`)
  return (
    <div>
        <h1>{props.discuss}</h1>
        <div className='discuss-content-container'>
            { content }
        </div>
    </div>
  )
}
