
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import Footer from './Footer';
// import problem_tags from '../data/data';

import SearchBar from './SearchBar';
import ItemList from './ItemList';
import RenderTable from './RenderTable';


export default function FilterBy(props) {
    
    const problem_tags=props.problem_tags;
    

    const [list,SetList]=useState('all');
    const [diff,Setdiff]=useState('all');
    const [status,Setstatus]=useState('all');

    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState([]);
    const [Acceptance , setAcceptance] = useState([]);
    const [Diff , setDiff] = useState([]);

    useEffect(()=>{
      const names = problem_tags.map((item) => item.name);
      const accep = problem_tags.map((item) => item.acceptance)
      const diff = problem_tags.map((item) => item.diff)
      setItems(names);
      setAcceptance(accep);
      setDiff(diff)
      
    },[])
    // console.log('search term is' + searchTerm)

  
    // Function to filter items based on search term
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(searchTerm.length === 0 ? 'true':'false')

  return (
    <div>
        <div className="filter-by">
        <select id="Lists" value={list} onChange={(e)=>{SetList(e.target.value)}}>
        <option value="all" >all</option>
        <option value="Favourites" >Favourites</option>
        <option value="Weekly" >Weekly Contest</option>
        <option value="Biweekly" >Biweekly contests</option>
        <option value="Long" >Long contests</option>
        <option value="Mid" >mid-week contests</option>
    </select>
    <select id="difficulty" onChange={(e)=>{Setdiff(e.target.value)}} >
    <option value="all">all</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        
    </select>
    <select id="Status" onChange={(e)=>{Setstatus(e.target.value)}}>
    <option value="all">all</option>
        <option value="fs">Fully solved</option>
        <option value="ps">Partially solved</option>
        <option value="na">not attempted</option>
        
    </select>

    <div>
  
      <SearchBar handleSearch={setSearchTerm} />
      {/* <ItemList items={filteredItems} /> */}
    </div>

        </div>
  

    <div className="show-filter">
    <table>
          <tr>
            <th>ProblemName</th>
            <th>Acceptance</th>
            <th>difficulty</th>
          </tr>
         {searchTerm.length ===0 ? <RenderTable list={list} diff={diff} status={status} problem_tags={problem_tags}/> : <ItemList items={filteredItems} acceptance={Acceptance} diff={Diff} />}

        </table>
    </div>

    <Footer/>
    </div>
  )
}