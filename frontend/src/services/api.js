const API_BASE_URL = 'https://buzzhub-ecru.vercel.app/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get headers with auth token
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Event endpoints (for future use)
  async getEvents() {
    return this.request('/events');
  }

  async getEvent(id) {
    return this.request(`/events/${id}`);
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  }

  async updateEvent(id, eventData) {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData)
    });
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: 'DELETE'
    });
  }

  // Review endpoints
  async getEventReviews(eventId) {
    return this.request(`/reviews/${eventId}`);
  }

  async createReview({ event, rating, comment }) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify({ event, rating, comment })
    });
  }

  async updateReview(id, { rating, comment }) {
    return this.request(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ rating, comment })
    });
  }

  async deleteReview(id) {
    return this.request(`/reviews/${id}`, {
      method: 'DELETE'
    });
  }
}

export default new ApiService();

