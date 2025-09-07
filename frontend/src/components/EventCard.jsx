import { Link } from "react-router-dom";

const mock = Array.from({ length: 8 }).map((_, i) => ({
  _id: i + 1,
  title: ["Synthwave Soirée", "Tech Talks Marathon", "Gourmet Pop-up", "Art Walk Downtown"][i % 4],
  category: ["Music", "Tech", "Food", "Art"][i % 4],
  cover: [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop",
  ][i % 4],
  description:
    [
      "A night of retro synthwave beats and neon vibes.",
      "Back-to-back sessions with industry experts on the latest in tech.",
      "Delicious dishes from local chefs at a one-day pop-up event.",
      "Explore creative works from emerging and established artists downtown.",
    ][i % 4],
}));

const Events = () => {
  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h2 style={{ margin: 0 }}>All Events</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <input className="input" placeholder="Search events..." />
            <button className="btn">Filters</button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid">
          {mock.map((e, i) => (
            <article key={i} className="card event-card glass">
              <img className="cover" src={e.cover} alt={e.title} />
              <div className="body">
                <span className="badge">{e.category}</span>
                <h3 style={{ margin: "10px 0 6px 0" }}>{e.title}</h3>
                <Link to={`/event/${e._id}`} className="btn btn-ghost">
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;