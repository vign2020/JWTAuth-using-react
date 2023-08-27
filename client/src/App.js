import React from 'react'
import Home from './components/Home';
import Register from './components/Register'
import PrivateRoutes from './utils/PrivateRoutes';
import Login from './components/Login'
import Trial from './components/Trial'
import Logout from './components/Logout'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'




export default function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/home" exact/>
             
            </Route>
            <Route element={<Register/>} path="/register" />
            <Route element={<Login />} path="/login" />
            <Route element={<Trial />} path ="/trial" />
            <Route element={<Logout/>} path="/logout" />
          </Routes>
      </Router>
    </div>
  );
}
