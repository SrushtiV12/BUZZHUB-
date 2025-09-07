import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="BuzzHub Home">
          <span className="brand-mark" />
          <span>BuzzHub</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/events" className="nav-link">Events</NavLink>
          <NavLink to="/chatbot" className="nav-link">🤖 ChatBot</NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink to="/create-event" className="nav-link">Create Event</NavLink>
              <NavLink to="/profile" className="nav-link">
                {user?.name || 'Profile'}
              </NavLink>
              <button 
                className="btn" 
                onClick={handleLogout}
                style={{ 
                  background: 'rgba(255, 88, 182, 0.1)', 
                  borderColor: 'var(--accent-pink)',
                  color: 'var(--accent-pink)'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <Link to="/register" className="btn btn-primary">Join Free</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar