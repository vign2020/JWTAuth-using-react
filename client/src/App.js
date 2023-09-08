import React from 'react'
import Home from './components/Home';
import Register from './components/Register'
import PrivateRoutes from './utils/PrivateRoutes';
import Login from './components/Login'
import Trial from './components/Trial'
import Logout from './components/Logout'
import Landing from './components/Landing'
import ProblemName from './components/ProblemName'
import Tag from './components/Tag'
import { useLocation } from 'react-router-dom';
import Problem from './components/Problem'
import CodeEditor from './components/CodeEditor';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar  from './components/Navbar';
import Func from './components/Func'
import Discuss from './components/Discuss';
import DiscussContent from './components/DiscussContent'; 

export default function App() {

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const tag = queryParams.get('tag');
  const problem_name = queryParams.get('problem_name')
  const discuss = queryParams.get('discuss');
 
  
  // console.log(` tag is ${tag}`)

  return (
    
    <div className="App">
      <Navbar/>
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/home" exact/>
                <Route path="/problem" element={<Problem />}/>
                <Route path="/tags" element={<Tag tag={tag} problem_name={problem_name}/>}/>
                <Route path="/problem_name" element={<ProblemName problem_name={problem_name}/>}/>
                <Route path="/code" element={<CodeEditor />} />
                <Route path="/discuss" element={<Discuss discuss={discuss}/>} />
                <Route path="/discuss-content" element={<DiscussContent discuss={discuss} />} />
                
            </Route>
            <Route path = "/" element={<Landing />} exact/>
            <Route element={<Register/>} path="/register" />
            <Route element={<Login />} path="/login" />
            <Route element={<Trial />} path ="/trial" />
            <Route element={<Logout/>} path="/logout" />
            <Route path='/searching' element={<Func /> } />

            
          </Routes>
      
    </div>
  );
}
