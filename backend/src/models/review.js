import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment: String,
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
