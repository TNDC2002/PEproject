import mongoose from "mongoose";

const MovieRatingSchema = new mongoose.Schema({
    movieID: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
);

const MovieRating = mongoose.model("Movie Average Rating", MovieRatingSchema);
export default MovieRating;