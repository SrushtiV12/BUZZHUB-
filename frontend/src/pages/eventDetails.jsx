// import { useParams, Link } from "react-router-dom";

// // Mock data matching backend event schema
// const eventsData = [
//   {
//     _id: 1,
//     title: "Neon Nights Festival",
//     description: "An electrifying night full of neon lights, music, and dancing. Experience the best of electronic music with world-class DJs, stunning visual effects, and an atmosphere that will transport you to another dimension. This is not just a concert - it's a journey through sound and light.",
//     category: "Music",
//     date: "2024-02-15T20:00:00.000Z",
//     location: {
//       city: "Los Angeles",
//       lat: 34.0522,
//       lng: -118.2437
//     },
//     organizer: {
//       _id: "org1",
//       name: "Neon Events Co.",
//       email: "contact@neonevents.com"
//     },
//     attendees: [
//       { _id: "user1", name: "Alex Johnson" },
//       { _id: "user2", name: "Sarah Chen" },
//       { _id: "user3", name: "Mike Rodriguez" }
//     ],
//     cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600&auto=format&fit=crop",
//     createdAt: "2024-01-15T10:00:00.000Z",
//     updatedAt: "2024-01-20T14:30:00.000Z"
//   },
//   {
//     _id: 2,
//     title: "Creators Meetup 2025",
//     description: "A meetup for creators, artists, and innovators to network, share ideas, and collaborate on exciting projects. Join us for inspiring talks, hands-on workshops, and meaningful connections that could change your creative journey forever.",
//     category: "Community",
//     date: "2024-03-10T18:00:00.000Z",
//     location: {
//       city: "San Francisco",
//       lat: 37.7749,
//       lng: -122.4194
//     },
//     organizer: {
//       _id: "org2",
//       name: "Creative Hub",
//       email: "hello@creativehub.com"
//     },
//     attendees: [
//       { _id: "user4", name: "Emma Wilson" },
//       { _id: "user5", name: "David Kim" }
//     ],
//     cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop",
//     createdAt: "2024-01-10T09:00:00.000Z",
//     updatedAt: "2024-01-18T16:45:00.000Z"
//   },
//   {
//     _id: 3,
//     title: "Street Food Carnival",
//     description: "Taste delicious food from around the world at one place. From authentic tacos to gourmet burgers, artisanal ice cream to craft cocktails - this is a foodie's paradise. Meet the chefs, learn their secrets, and discover your new favorite dish.",
//     category: "Food",
//     date: "2024-02-28T12:00:00.000Z",
//     location: {
//       city: "Austin",
//       lat: 30.2672,
//       lng: -97.7431
//     },
//     organizer: {
//       _id: "org3",
//       name: "Foodie Events",
//       email: "info@foodieevents.com"
//     },
//     attendees: [
//       { _id: "user6", name: "Lisa Park" },
//       { _id: "user7", name: "James Brown" },
//       { _id: "user8", name: "Maria Garcia" },
//       { _id: "user9", name: "Tom Anderson" }
//     ],
//     cover: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1600&auto=format&fit=crop",
//     createdAt: "2024-01-05T11:30:00.000Z",
//     updatedAt: "2024-01-22T13:20:00.000Z"
//   },
//   {
//     _id: 4,
//     title: "Indie Film Showcase",
//     description: "Experience unique indie films from emerging filmmakers. Discover hidden gems, meet the directors, and be part of intimate Q&A sessions. This showcase celebrates creativity, storytelling, and the power of independent cinema.",
//     category: "Film",
//     date: "2024-03-20T19:30:00.000Z",
//     location: {
//       city: "New York",
//       lat: 40.7128,
//       lng: -74.0060
//     },
//     organizer: {
//       _id: "org4",
//       name: "Indie Cinema Collective",
//       email: "contact@indiecinema.com"
//     },
//     attendees: [
//       { _id: "user10", name: "Rachel Green" },
//       { _id: "user11", name: "Chris Taylor" }
//     ],
//     cover: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop",
//     createdAt: "2024-01-12T15:00:00.000Z",
//     updatedAt: "2024-01-25T10:15:00.000Z"
//   }
// ];

// export default function EventDetails() {
//   const { id } = useParams();
//   const event = eventsData.find((e) => e._id === parseInt(id));

//   if (!event) {
//     return (
//       <section className="section">
//         <div className="container">
//           <div className="card glass" style={{ padding: 40, textAlign: 'center' }}>
//             <h2>Event not found</h2>
//             <p style={{ color: 'var(--muted)', marginBottom: 20 }}>The event you're looking for doesn't exist or has been removed.</p>
//             <Link to="/events" className="btn btn-primary">Back to Events</Link>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <section className="section">
//       <div className="container">
//         {/* Back button */}
//         <div style={{ marginBottom: 20 }}>
//           <Link to="/events" className="btn btn-ghost">← Back to Events</Link>
//         </div>

//         {/* Event Hero */}
//         <div className="card glass" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
//           <div style={{ position: 'relative' }}>
//             <img 
//               src={event.cover} 
//               alt={event.title} 
//               style={{ 
//                 width: '100%', 
//                 height: '400px', 
//                 objectFit: 'cover',
//                 filter: 'brightness(0.7)'
//               }} 
//             />
//             <div style={{ 
//               position: 'absolute', 
//               bottom: 0, 
//               left: 0, 
//               right: 0, 
//               background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
//               padding: '40px 30px 30px 30px',
//               color: 'white'
//             }}>
//               <div className="badge badge-cyan" style={{ marginBottom: 12 }}>{event.category}</div>
//               <h1 style={{ fontSize: '48px', margin: '0 0 8px 0', fontWeight: 700 }}>{event.title}</h1>
//               <p style={{ fontSize: '18px', margin: 0, opacity: 0.9 }}>{event.description}</p>
//             </div>
//           </div>
//         </div>

//         {/* Event Details Grid */}
//         <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
//           {/* Main Content */}
//           <div>
//             {/* Event Info */}
//             <div className="card glass" style={{ padding: 24, marginBottom: 20 }}>
//               <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
//                 📅 Event Details
//               </h3>
//               <div style={{ display: 'grid', gap: 12 }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                   <span style={{ color: 'var(--muted)', minWidth: '80px' }}>Date:</span>
//                   <span>{formatDate(event.date)}</span>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                   <span style={{ color: 'var(--muted)', minWidth: '80px' }}>Location:</span>
//                   <span>📍 {event.location.city}</span>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                   <span style={{ color: 'var(--muted)', minWidth: '80px' }}>Organizer:</span>
//                   <span>{event.organizer.name}</span>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                   <span style={{ color: 'var(--muted)', minWidth: '80px' }}>Attendees:</span>
//                   <span>{event.attendees.length} people going</span>
//                 </div>
//               </div>
//             </div>

//             {/* Attendees List */}
//             <div className="card glass" style={{ padding: 24 }}>
//               <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
//                 👥 Who's Going ({event.attendees.length})
//               </h3>
//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//                 {event.attendees.map((attendee) => (
//                   <div key={attendee._id} className="badge" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
//                     <div style={{ 
//                       width: 20, 
//                       height: 20, 
//                       borderRadius: '50%', 
//                       background: 'var(--accent-cyan)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '10px',
//                       color: 'var(--bg)'
//                     }}>
//                       {attendee.name.charAt(0)}
//                     </div>
//                     {attendee.name}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div>
//             {/* Action Buttons */}
//             <div className="card glass" style={{ padding: 24, marginBottom: 20 }}>
//               <h3 style={{ margin: '0 0 16px 0' }}>Actions</h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//                 <button className="btn btn-primary" style={{ width: '100%' }}>
//                   Join Event
//                 </button>
//                 <button className="btn btn-ghost" style={{ width: '100%' }}>
//                   Share Event
//                 </button>
//                 <button className="btn btn-ghost" style={{ width: '100%' }}>
//                   Add to Calendar
//                 </button>
//               </div>
//             </div>

//             {/* Event Stats */}
//             <div className="card glass" style={{ padding: 24 }}>
//               <h3 style={{ margin: '0 0 16px 0' }}>Event Stats</h3>
//               <div style={{ display: 'grid', gap: 12 }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <span style={{ color: 'var(--muted)' }}>Created:</span>
//                   <span>{new Date(event.createdAt).toLocaleDateString()}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <span style={{ color: 'var(--muted)' }}>Last Updated:</span>
//                   <span>{new Date(event.updatedAt).toLocaleDateString()}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <span style={{ color: 'var(--muted)' }}>Category:</span>
//                   <span className="badge">{event.category}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Reviews from '../components/Reviews.jsx';

// Mock data
const eventsData = [
  {
    _id: 1,
    title: "Neon Nights Festival",
    description:
      "An electrifying night full of neon lights, music, and dancing. Experience the best of electronic music with world-class DJs, stunning visual effects, and an atmosphere that will transport you to another dimension.",
    category: "Music",
    date: "2024-02-15T20:00:00.000Z",
    location: { city: "Los Angeles" },
    organizer: { name: "Neon Events Co." },
    attendees: [
      { _id: "user1", name: "Alex Johnson" },
      { _id: "user2", name: "Sarah Chen" },
      { _id: "user3", name: "Mike Rodriguez" },
    ],
    cover:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600&auto=format&fit=crop",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-20T14:30:00.000Z",
  },
];

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await api.getEvent(id);
        setEvent(data);
      } catch (e) {
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="text-gray-400">Loading event...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="bg-gray-900 text-gray-100 rounded-2xl shadow-lg p-10 w-full max-w-lg text-center">
          <h2 className="text-2xl font-bold mb-3">Event Not Found</h2>
          <p className="text-gray-400 mb-6">
            {error || 'The event you’re looking for doesn’t exist or has been removed.'}
          </p>
          <Link
            to="/events"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <Link
          to="/events"
          className="text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to Events
        </Link>

        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={event.cover}
            alt={event.title}
            className="w-full h-[400px] object-cover brightness-75"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <span className="inline-block bg-blue-500 text-sm px-3 py-1 rounded-full mb-3">
              {event.category}
            </span>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <p className="text-gray-300 max-w-3xl">{event.description}</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* Event Info */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">📅 Event Details</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span>{formatDate(event.date)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span>📍 {event.location.city}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Organizer:</span>
                  <span>{event.organizer.name}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Attendees:</span>
                  <span>{event.attendees.length} people going</span>
                </li>
              </ul>
            </div>

            {/* Attendees */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                👥 Who’s Going ({event.attendees.length})
              </h3>
              <div className="flex flex-wrap gap-3">
                {event.attendees.map((a) => (
                  <div
                    key={a._id}
                    className="px-3 py-1 bg-gray-800 rounded-full flex items-center gap-2 text-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-gray-950 flex items-center justify-center text-xs font-bold">
                      {a.name.charAt(0)}
                    </div>
                    {a.name}
                  </div>
                ))}
              </div>
            </div>
            {/* Reviews */}
            <Reviews eventId={event._id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">
                  Join Event
                </button>
                <button className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium">
                  Share Event
                </button>
                <button className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium">
                  Add to Calendar
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Event Stats</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-400">Created:</span>
                  <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Last Updated:</span>
                  <span>{new Date(event.updatedAt).toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="bg-blue-500 px-2 py-0.5 rounded-full text-xs text-gray-950">
                    {event.category}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
