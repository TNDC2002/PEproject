import mongoose from "mongoose";

const UserRateMovieSchema = new mongoose.Schema({
   userID: {
    type: String,
    required: true
   },
   movieID: {
    type: String,
    required: true
   },
   rating: {
    type: Number,
    required: true
   },
   media_type: {
    type: String,
    required: true
   },
   season: {
    type: Number,
    required: true,
    default: 0
   }
}, 
    { timestamps: true }
);

const UserRateMovie = mongoose.model("User-Movie Rating", UserRateMovieSchema);
export default UserRateMovie;