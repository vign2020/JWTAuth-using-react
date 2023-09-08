import React from 'react'
import data from '../data/data';
import {Link} from 'react-router-dom';

export default function Tag(props) {
  const problem_tags=data[1];

  return (
    <div>
        <h1>{props.tag}</h1>
   <div className="show-filter">


   
        <table>
  <tr>
    <th>Tag</th>
    <th>Acceptance</th>
    <th>difficulty</th>
  </tr>
{
    problem_tags.filter((item,index)=>item.tag===props.tag).map((item,index)=>{
        return(
            <>
             <tr>
                <td><Link to={`/problem_name?problem_name=${item.name}`}>{item.name}</Link></td>
                <td>{item.acceptance}</td> 
                <td>{item.diff}</td>
            </tr>
            
            </>
        )
    })
}

</table>
</div>
    </div>
  )
}
