import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Star = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#fbbf24' : 'none'} stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15 10 23 10 17 14 19 22 12 18 5 22 7 14 1 10 9 10 12 2" />
  </svg>
);

const Reviews = ({ eventId }) => {
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await api.getEventReviews(eventId);
      setReviews(data);
      setError('');
    } catch (e) {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      loadReviews();
    }
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    try {
      setSubmitting(true);
      await api.createReview({ event: eventId, rating, comment: comment.trim() });
      setComment('');
      setRating(5);
      await loadReviews();
    } catch (e) {
      setError(e.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Reviews</h3>

      {loading ? (
        <p className="text-gray-400">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-400">No reviews yet. Be the first to review!</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {reviews.map((r) => (
            <li key={r._id} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500 text-gray-950 flex items-center justify-center text-xs font-bold">
                    {(r.user?.username || r.user?.email || 'U').charAt(0)}
                  </div>
                  <span className="text-sm text-gray-300">{r.user?.username || r.user?.email || 'User'}</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < r.rating} />
                  ))}
                </div>
              </div>
              {r.comment && <p className="text-gray-300 text-sm">{r.comment}</p>}
              <p className="text-xs text-gray-500 mt-2">{new Date(r.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-gray-300">Your rating:</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setRating(i + 1)}
                  aria-label={`Rate ${i + 1}`}
                >
                  <Star filled={i < rating} />
                </button>
              ))}
            </div>
          </div>

          <textarea
            className="w-full bg-gray-800 rounded-lg p-3 text-gray-100 placeholder-gray-400"
            placeholder="Share your thoughts about this event..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-gray-950 font-medium"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      ) : (
        <p className="text-gray-400 text-sm">Log in to write a review.</p>
      )}
    </div>
  );
};

export default Reviews;


