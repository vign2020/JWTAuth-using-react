import React from 'react'
import {Link} from 'react-router-dom';
import Logout from './Logout'

export default function Navbar() {
  return (
    <div>
         <nav>
        <ul>
            <li><Link to="/problem">Problems</Link></li>
            <li><Link to="/discuss">Discuss</Link></li>
            <li><Link to="/profile">Profile</Link></li>
        </ul>
        <Logout />
    </nav>
    </div>
  )
}
