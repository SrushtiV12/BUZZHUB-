// import express from "express";
// const router = express.Router();

// // Example route
// router.get("/", (req, res) => {
//   res.send("Review route works!");
// });

// export default router;

import express from "express";
import { createReview, getEventReviews, updateReview, deleteReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReview); // POST /api/reviews
router.get("/:eventId", getEventReviews); // GET /api/reviews/:eventId
router.put("/:id", protect, updateReview); // PUT /api/reviews/:id
router.delete("/:id", protect, deleteReview); // DELETE /api/reviews/:id

export default router;

