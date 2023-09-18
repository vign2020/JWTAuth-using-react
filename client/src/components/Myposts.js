import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import {Link} from 'react-router-dom';


export default function Myposts() {
    const [combined , Setcombined] = useState([])
    const [title , setTitle]=useState(null);


    const [cookies] = useCookies(['CurrentUser', 'token', 'AuthToken']);
    // const [ cookies, setCookie, removeCookie] = useCookies(null)
    const curr_user = cookies.CurrentUser;


    const handleClickPosts = async (e)=>{
        // e.preventDefault();
        try{
            const resp = await axios.post('http://localhost:5000/my-post' , { curr_user})
            console.log(resp.data.Combined)
            Setcombined(resp.data.Combined)
            

        }catch(e){
            console.log(e)
        }
    }
    const deletePosts = async(e)=>{
        console.log(title)

        try{ 
            const resp = await axios.post('http://localhost:5000/posts-delete',{title : title , curr_user : curr_user})
          
            if(resp.data && resp.data.status === 200){
                window.location.reload();
            }
            
        }catch(e){
            console.log(e)
        }
       
    }
    useEffect(()=>{
        handleClickPosts();
    },[])
    useEffect(()=>{
        deletePosts();
    },[title])

  return (
    <div>
        <h1>MyPosts</h1>
        <div className="myposts-container">
            {
                combined.length === 0 ?  
                <h1 className='myposts-container-oops'>Oops!!! no posts for now :( click on discuss to create one!!!  </h1>
                : 
                    combined.map((item  , index)=>{
                        const bgcol = index%2 ===0 ? 'odd' : 'even';
                        const title=item.title
    
                        return(
                            <div key={index} className={`post-${bgcol}`}>
                            <p><Link to={`/discuss-content?discuss=${item.title}`}>{title.toUpperCase()}</Link></p>
                            <button className='button-delete' onClick={()=>{
                                setTitle(item.title);
                                
                            }}>delete</button>
                        
                        </div>
                           
                        )
                     
                        
                    })
                 

            }
           
        </div>
    </div>
  )
}
