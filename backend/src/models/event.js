import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title:       { type: String, required: [true, "Event title is required"] },
  description: { type: String, required: [true, "Event description is required"] },
  category:    { type: String, default: "General" },
  date:        { type: Date, required: [true, "Event date is required"] },
  location: {
    city: { type: String, required: true }
    // lat: { type: Number, required: true },
    // lng: { type: Number, required: true }
  },
  organizer:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  attendees:   [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, 
{ timestamps: true }
);

export default mongoose.model("Event", eventSchema);
