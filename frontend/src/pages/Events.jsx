import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import apiService from '../services/api.js';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await apiService.getEvents();
        setEvents(eventsData);
        setError('');
      } catch (err) {
        setError('Failed to load events. Please try again.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const categories = ['All', ...new Set(events.map(event => event.category))];

  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
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

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-gray-600 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading events...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center shadow-lg">
          <h3 className="text-pink-500 text-lg font-semibold mb-2">Error Loading Events</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            className="bg-cyan-500 text-black px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6 text-gray-200">

        {/* Header with Search and Filters */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">All Events</h2>
            <p className="text-gray-400">Discover amazing events happening around you</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              className="bg-white/10 text-gray-200 placeholder-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition w-64"
              placeholder="Search events, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="bg-gray-900 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Link
              to="/create-event"
              className="bg-cyan-500 !text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition blackspace-nowrap"
            >
              + Create Event
            </Link>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-400 mb-4">
          Showing {filteredEvents.length} of {events.length} events
        </p>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <article key={event._id} className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow flex flex-col text-gray-200">
              <div className="relative">
                <img
                  src={event.cover || getDefaultCover(event.category)}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-semibold">
                  {formatDate(event.date)}
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-cyan-500 text-black px-2 py-1 rounded text-xs font-medium">{event.category}</span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-1 line-clamp-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{event.description}</p>

                {/* Event Details */}
                <div className="flex flex-col gap-1 mb-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1"><span>📍</span>{event.location.city}</div>
                  <div className="flex items-center gap-1"><span>🕒</span>{formatTime(event.date)}</div>
                  <div className="flex items-center gap-1"><span>👥</span>{event.attendees ? event.attendees.length : 0} going</div>
                  {event.organizer && (
                    <div className="flex items-center gap-1"><span>👤</span>by {event.organizer.username || event.organizer.name || 'Unknown'}</div>
                  )}
                </div>

                <Link
                  to={`/event/${event._id}`}
                  className="bg-cyan-500 !text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition text-center mt-auto"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && !loading && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center shadow-lg">
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-gray-400 mb-4">
              {events.length === 0
                ? "No events have been created yet. Be the first to create one!"
                : "Try adjusting your search terms or category filter"
              }
            </p>
            {events.length === 0 ? (
              <Link
                to="/create-event"
                className="bg-cyan-500 text-black px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
              >
                Create First Event
              </Link>
            ) : (
              <button
                className="bg-transparent border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
