// import { Link } from "react-router-dom";

// const mock = Array.from({ length: 8 }).map((_, i) => ({
//   _id: i + 1,
//   title: ["Synthwave Soirée", "Tech Talks Marathon", "Gourmet Pop-up", "Art Walk Downtown"][i % 4],
//   category: ["Music", "Tech", "Food", "Art"][i % 4],
//   cover: [
//     "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop",
//   ][i % 4],
//   description:
//     [
//       "A night of retro synthwave beats and neon vibes.",
//       "Back-to-back sessions with industry experts on the latest in tech.",
//       "Delicious dishes from local chefs at a one-day pop-up event.",
//       "Explore creative works from emerging and established artists downtown.",
//     ][i % 4],
// }));

// const Events = () => {
//   return (
//     <section className="section">
//       <div className="container">
//         {/* Header */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 16,
//           }}
//         >
//           <h2 style={{ margin: 0 }}>All Events</h2>
//           <div style={{ display: "flex", gap: 10 }}>
//             <input className="input" placeholder="Search events..." />
//             <button className="btn">Filters</button>
//           </div>
//         </div>

//         {/* Events Grid */}
//         <div className="grid">
//           {mock.map((e, i) => (
//             <article key={i} className="card event-card glass">
//               <img className="cover" src={e.cover} alt={e.title} />
//               <div className="body">
//                 <span className="badge">{e.category}</span>
//                 <h3 style={{ margin: "10px 0 6px 0" }}>{e.title}</h3>
//                 <Link to={`/event/${e._id}`} className="btn btn-ghost">
//                   View Details
//                 </Link>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Events;

import { Link } from "react-router-dom";

const EventCard = ({ event, formatDate, formatTime, getDefaultCover }) => {
  return (
    <article className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow flex flex-col text-gray-200">
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
          <span className="bg-cyan-500 text-black px-2 py-1 rounded text-xs font-medium">
            {event.category}
          </span>
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
            <div className="flex items-center gap-1">
              <span>👤</span>by {event.organizer.username || event.organizer.name || "Unknown"}
            </div>
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
  );
};

export default EventCard;
