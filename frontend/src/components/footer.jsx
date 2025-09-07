import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="brand-mark" />
          <strong>BuzzHub</strong>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/events" className="nav-link">Explore</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer