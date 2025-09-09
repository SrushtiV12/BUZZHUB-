import Event from "../models/event.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const { title, description, category, date, location } = req.body;

    if (!title || !description || !date || !location?.city ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const event = await Event.create({
      title,
      description,
      category: category || "General",
      date,
      location,
      organizer: req.user.id
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({createdAt:-1})
      .populate("organizer", "username email")
      .populate("attendees", "username email");

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "username email")
      .populate("attendees", "username email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Join Event
export const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // ✅ Safe ObjectId check
    const alreadyJoined = event.attendees.some(att => att.equals(req.user.id));

    if (!alreadyJoined) {
      event.attendees.push(req.user.id);
      await event.save();
    }

    const updatedEvent = await Event.findById(req.params.id)
      .populate("organizer", "username email")
      .populate("attendees", "username email");

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

