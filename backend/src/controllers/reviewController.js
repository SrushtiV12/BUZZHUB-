import Review from "../models/review.js";
import Event from "../models/event.js";

// Create a review
export const createReview = async (req, res) => {
  try {
    const { event, comment, rating } = req.body;

    // Ensure the event exists
    const foundEvent = await Event.findById(event);
    if (!foundEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    const review = await Review.create({
      event,
      user: req.user.id, // from JWT middleware
      comment,
      rating,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reviews for a specific event
export const getEventReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ event: req.params.eventId })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update a review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user.id, // only owner can edit
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found or not authorized" });
    }

    review.comment = req.body.comment || review.comment;
    review.rating = req.body.rating || review.rating;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // only owner can delete
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found or not authorized" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
