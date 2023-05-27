import mongoose from "mongoose";

const MovieAvailabilitySchema = new mongoose.Schema(
  {
    movieID: {
      type: String,
      required: true,
    },
    media_type: {
      type: String,
      required: true,
    },
    season: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const MovieAvailability = mongoose.model("MovieAvailability", MovieAvailabilitySchema);
export default MovieAvailability;
