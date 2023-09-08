import React from 'react'
import {Link} from 'react-router-dom';

export default function RenderTable(props) {
    let list = props.list
    let diff = props.diff
    let status = props.status
    let problem_tags=props.problem_tags
    let items = props.items
   

  return (
    problem_tags.filter((item,index)=> (list==='all' || item.list.includes(list)) && 
                                  (diff==='all' || item.diff===diff) && 
                                  (status==='all' || item.status===status)).map((item,index)=>{

  return(
    <>
    <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
      <td><Link to = {`/problem_name?problem_name=${item.name}`} >{item.name}</Link></td>
       <td>{item.acceptance}</td>
       <td>{item.diff}</td>
     </tr>

     </>
    )

            })
  )
}
