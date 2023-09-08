import React from 'react'
import {Link} from 'react-router-dom';

export default function ItemList({items , acceptance , diff}) {

    return (
        <>
          {items.map((item, index) => (
            

        <>
        <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
            <td><Link to = {`/problem_name?problem_name=${item}`} >{item}</Link></td>
            <td>{acceptance[index]}</td>
            <td>{diff[index]}</td>
        </tr>
       </>

          ))}
          </>
      );
}
