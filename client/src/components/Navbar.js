import React from 'react'
import {Link} from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
         <nav>
        <ul>
            <li><Link to="/problem">Problems</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/contest">Contest</Link></li>
            <li><Link to="/discuss">Discuss</Link></li>
        </ul>
    </nav>
    </div>
  )
}
