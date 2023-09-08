import React from 'react'

export default function Footer() {
  return (
    <div>
          <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
        <div className="footer-copy">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</div>
      </div>
    </footer>
    </div>
  )
}
