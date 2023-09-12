import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import {Link} from 'react-router-dom';

export default function Discuss() {
    const [Resp , setResp] = useState(null)
    const [show , Setshow] = useState('false')
    const [title , Settitle] = useState('')
    const [content , Setcontent] = useState(''); 
    const [UserPosts , setUserPosts]= useState([]);
    const [userTimestamps , setuserTimestamps] =useState([]);

    const [cookies] = useCookies(['CurrentUser', 'token', 'AuthToken']);
    // const [ cookies, setCookie, removeCookie] = useCookies(null)


    const handleClick = ()=>{
        Setshow('true')
    }
    const closeForm=(e)=>{
        e.preventDefault()
        Setshow('false')
    }
    console.log('user is' + cookies.CurrentUser)
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            
            const curr_user = cookies.CurrentUser
            console.log(curr_user)

            const resp = await axios.post('http://localhost:5000/discuss',{
                title , content , curr_user
            })
            if(resp.status === 201) alert('post made successfully!')
            if(resp.status === 401) alert('could not post')
        }catch(e){
            console.log(e)
        }
    }

    const Disscuss_func= async ()=>{
        try{
            const resp =  await axios.get('http://localhost:5000/discuss')
            setUserPosts(resp.data.userTitle)
            setuserTimestamps(resp.data.timestamp)

            // console.log('fetched data :' + resp.data.userPosts)
            
        }catch(e){
            setResp(['none'])
        }
        
    }

    useEffect(()=>{
        Disscuss_func();
    },[])
    

    console.log(`TimeStamp array : ${userTimestamps}`)
  return (
    <div>
        <h1>{Resp}</h1>
        
<button className="toggle" onClick={handleClick}>+NEW CONTENT</button>
    <form action='POST' class={`form-discuss-show-${show}`}>
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" onChange={(e)=>{
            Settitle(e.target.value)
        }} required />
        <br/><br/>
        <label for="post">Post:</label>
        <textarea id="post" name="post" rows="5" cols="40" onChange={(e) =>{
            Setcontent(e.target.value)
        }} required></textarea>
        <br/><br/>
        <button type="submit" onClick={handleSubmit}>POST</button>
        <button class="close" onClick={closeForm}>CLOSE</button>

    </form>

    <div className="show-posts-discuss-container">
        {UserPosts.map((item , index)=>{
            const bgcol = index%2 ===0 ? 'odd' : 'even';

            return(
                
        <div key={index} className={`post-${bgcol}`}>
            
            <p><Link to={`/discuss-content?discuss=${item}`}>{item}</Link></p>
            <p className='timestamp'>CREATED AT: &nbsp;{userTimestamps[index]}</p>

            {/* <div className="buttons-container-discussion">
                    <button className="upvote-button">Upvote</button>
                    <button className="view-button">View</button>
                </div> */}

          </div>
                
            )
            
        })}
    </div>
    </div>
  )
}
