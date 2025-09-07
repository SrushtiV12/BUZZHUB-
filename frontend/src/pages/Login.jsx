import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  
  const { login, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component mounts or form changes
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/profile');
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="card glass form" style={{ padding: 32, maxWidth: 480 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className="badge badge-cyan">Welcome back</div>
            <h2 style={{ margin: '12px 0 8px 0', fontSize: '32px' }}>Login</h2>
            <p style={{ color: 'var(--muted)', margin: 0 }}>Sign in to your BuzzHub account</p>
          </div>
          
          <img 
            alt="login visual" 
            style={{ 
              width: '100%', 
              borderRadius: 12, 
              marginBottom: 24,
              height: '200px',
              objectFit: 'cover'
            }} 
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop"
          />

          {error && (
            <div style={{
              background: 'rgba(255, 88, 182, 0.1)',
              border: '1px solid rgba(255, 88, 182, 0.3)',
              borderRadius: 8,
              padding: 12,
              marginBottom: 20,
              color: 'var(--accent-pink)',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label style={{ fontWeight: '600', marginBottom: '6px' }}>Email</label>
              <input 
                className="input" 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={{
                  borderColor: validationErrors.email ? 'var(--accent-pink)' : 'var(--border)'
                }}
              />
              {validationErrors.email && (
                <span style={{ color: 'var(--accent-pink)', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.email}
                </span>
              )}
            </div>

            <div className="field">
              <label style={{ fontWeight: '600', marginBottom: '6px' }}>Password</label>
              <input 
                className="input" 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{
                  borderColor: validationErrors.password ? 'var(--accent-pink)' : 'var(--border)'
                }}
              />
              {validationErrors.password && (
                <span style={{ color: 'var(--accent-pink)', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.password}
                </span>
              )}
            </div>

            <button 
              className="btn btn-primary" 
              type="submit"
              style={{ width: '100%', marginBottom: 16 }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
            <span>Don't have an account? </span>
            <Link to="/register" style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>
              Create one here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;