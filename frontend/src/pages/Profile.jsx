import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-10 text-center shadow-lg">
          <div className="text-gray-300 text-lg">Loading...</div>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-10 text-center shadow-lg">
          <h2 className="text-gray-200 text-xl font-semibold mb-4">Please log in to view your profile</h2>
          <button
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">

        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 flex flex-wrap items-center gap-6 shadow-lg">
          <div className="relative">
            <img
              alt="avatar"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=8b5cf6&color=fff&size=120`}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-purple-500 shadow-lg"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-lime-500 border-2 border-black flex items-center justify-center text-black text-xs font-bold">
              ✓
            </div>
          </div>
          <div className="flex-1 min-w-[200px] text-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <span>@</span>
              <span className="text-cyan-400 font-semibold">{user.username}</span>
            </div>
            <div className="mb-4">{user.email}</div>
            <span className="inline-block bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              BuzzHub Member
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              className="bg-transparent border border-gray-600 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              onClick={() => navigate('/events')}
            >
              Browse Events
            </button>
            <button
              className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
              onClick={() => navigate('/events')}
            >
              Create Event
            </button>
            <button
              className="bg-pink-600/20 border border-pink-500 text-pink-400 px-4 py-2 rounded-lg hover:bg-pink-700/30 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-200">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 text-center shadow">
            <div className="text-2xl font-bold text-cyan-400 mb-1">0</div>
            <div className="text-gray-300 text-sm">Events Attended</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 text-center shadow">
            <div className="text-2xl font-bold text-purple-500 mb-1">0</div>
            <div className="text-gray-300 text-sm">Events Created</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 text-center shadow">
            <div className="text-2xl font-bold text-lime-500 mb-1">0</div>
            <div className="text-gray-300 text-sm">Reviews Written</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 text-center shadow">
            <div className="text-2xl font-bold text-amber-400 mb-1">0</div>
            <div className="text-gray-300 text-sm">Connections</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'My Bookmarks',
              description: "Events you've saved for later",
              cover: 'https://images.unsplash.com/photo-1521337581557-3a57b4a8c62a?q=80&w=1200&auto=format&fit=crop',
              action: 'View Bookmarks',
              color: 'bg-cyan-500',
            },
            {
              title: 'Going Next',
              description: "Upcoming events you're attending",
              cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
              action: 'View Events',
              color: 'bg-purple-500',
            },
            {
              title: 'Past Events',
              description: "Events you've attended recently",
              cover: 'https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1200&auto=format&fit=crop',
              action: 'View History',
              color: 'bg-lime-500',
            },
          ].map((item, i) => (
            <article
              key={i}
              className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow cursor-pointer flex flex-col"
            >
              <div className="relative">
                <img src={item.cover} alt={item.title} className="w-full h-40 object-cover" />
                <div
                  className={`${item.color} text-white px-2 py-1 rounded-md absolute top-3 left-3 text-xs font-semibold`}
                >
                  {item.action}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1 text-gray-200">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                <button
                  className="bg-transparent border border-gray-600 text-gray-200 px-3 py-2 rounded-lg hover:bg-gray-800 transition mt-auto"
                  onClick={() => navigate('/events')}
                >
                  {item.action}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Account Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-6 shadow text-gray-200">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">🔐 Account Information</h3>
          <div className="grid gap-3">
            <div className="flex justify-between">
              <span>User ID:</span>
              <span className="font-mono text-sm">{user._id}</span>
            </div>
            <div className="flex justify-between">
              <span>Member Since:</span>
              <span>Just now</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Account Status:</span>
              <span className="bg-cyan-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
