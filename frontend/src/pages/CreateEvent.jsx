import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.js';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    date: '',
    location: {
      city: ''
      // lat: '',
      // lng: ''
    }
  });

  const categories = [
    'General', 'Music','Dance', 'Community', 'Food', 'Film', 'Tech', 'Art', 
    'Fitness', 'Sports', 'Education', 'Business', 'Health', 'Travel'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLocationSearch = async () => {
    if (!formData.location.city.trim()) {
      setError('Please enter a city name first');
      return;
    }
  }

    

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Event title is required');
      setLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      setError('Event description is required');
      setLoading(false);
      return;
    }

    if (!formData.date) {
      setError('Event date is required');
      setLoading(false);
      return;
    }

    if (!formData.location.city.trim()) {
      setError('Event location (city) is required');
      setLoading(false);
      return;
    }

   

    // Check if date is in the future
    const eventDate = new Date(formData.date);
    const now = new Date();
    if (eventDate <= now) {
      setError('Event date must be in the future');
      setLoading(false);
      return;
    }

    try {
      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        date: eventDate.toISOString(),
        location: {
          city: formData.location.city.trim()
        }
      };

      const createdEvent = await apiService.createEvent(eventData);
      console.log('Event created successfully:', createdEvent);
      
      // Navigate to events page to see the new event
      navigate('/events');
    } catch (err) {
      setError(err.message || 'Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <section className="section py-10">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Create New Event</h1>
          <p className="text-gray-400 text-lg m-0">
            Share your event with the community
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-xl shadow p-6">
          {/* Event Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block font-semibold mb-2 text-gray-100">
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input w-full"
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Event Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block font-semibold mb-2 text-gray-100">
              Event Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="input w-full resize-y"
              placeholder="Describe your event in detail..."
              required
              rows={4}
            />
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block font-semibold mb-2 text-gray-100">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input w-full"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block font-semibold mb-2 text-gray-100">
                Event Date & Time *
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="input w-full"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Event Location *</h3>

            {/* City */}
            <div className="mb-4">
              <label htmlFor="city" className="block font-semibold mb-2 text-gray-100">
                City
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="city"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleInputChange}
                  className="input flex-1"
                  placeholder="Enter city name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="btn btn-ghost"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="bg-gray-700 text-gray-100 rounded p-4 mt-6">
          <h4 className="font-semibold mb-2">💡 Tips for creating a great event:</h4>
          <ul className="list-disc pl-5 m-0">
            <li>Write a clear, engaging title that describes your event</li>
            <li>Provide detailed description including what attendees can expect</li>
            <li>Choose the most appropriate category for better discoverability</li>
            <li>Set the date and time clearly - events must be in the future</li>
            <li>Ensure location coordinates are accurate for proper mapping</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

};

export default CreateEvent ;
