import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import apiService from '../services/api.js';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await apiService.getEvents();
        setEvents(data.slice(0, 6));
        setError('');
      } catch (e) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDefaultCover = (category) => {
    const covers = {
      'Music': 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600&auto=format&fit=crop',
      'Community': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop',
      'Food': 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1600&auto=format&fit=crop',
      'Film': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
      'Tech': 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
      'Art': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop',
      'Fitness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop',
      'General': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop'
    };
    return covers[category] || covers['General'];
  };

  return (
    <>
      <section className="section hero">
        <div className="container hero-grid">
          <div>
            <div className="badge badge-cyan">Discover. Connect. Celebrate.</div>
            <h1 className="hero-title">Find the most exciting events around you</h1>
            <p className="hero-sub">Colorful, professional, and a little funky — BuzzHub curates concerts, meetups, and festivals with stunning visuals and real community vibes.</p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="/events">Browse Events</a>
              <a className="btn btn-ghost" href="/register">Create Account</a>
            </div>
          </div>
          <div className="poster glass card">
            <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop" alt="Crowd cheering at a concert" />
            <div className="poster-overlay"></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="badge badge-pink">Latest events</div>
          {loading ? (
            <p style={{ color: 'var(--muted)', marginTop: 12 }}>Loading...</p>
          ) : error ? (
            <p style={{ color: 'var(--danger)', marginTop: 12 }}>{error}</p>
          ) : (
            <div className="grid" style={{ marginTop: 16 }}>
              {events.map((e) => (
                <article key={e._id} className="card event-card glass">
                  <img className="cover" src={e.cover || getDefaultCover(e.category)} alt={e.title} />
                  <div className="body">
                    <span className="badge">{e.category || 'General'}</span>
                    <h3 style={{ margin: '10px 0 6px 0' }}>{e.title}</h3>
                    <div style={{ display: 'flex', gap: 10, color: 'var(--muted)', fontSize: 14, marginBottom: 10 }}>
                      <span>📍 {e.location?.city}</span>
                      <span>•</span>
                      <span>{formatDate(e.date)}</span>
                    </div>
                    <Link to={`/event/${e._id}`} className="btn">View details</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
