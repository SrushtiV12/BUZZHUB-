import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../services/api";
import Reviews from "../components/Reviews.jsx";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await api.getEvent(id);
        setEvent(data);
      } catch (e) {
        setError("Failed to load event");
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
            {error ||
              "The event you’re looking for doesn’t exist or has been removed."}
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

  // Common classes
  const card = "bg-gray-900 p-6 rounded-xl shadow-lg";
  const sectionTitle = "text-xl font-semibold mb-4";

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
            <div className={card}>
              <h3 className={sectionTitle}>📅 Event Details</h3>
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
            <div className={card}>
              <h3 className={sectionTitle}>
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
            <div className={card}>
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
            <div className={card}>
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
