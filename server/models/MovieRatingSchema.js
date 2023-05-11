import mongoose from "mongoose";

const UserRateMovieSchema = new mongoose.Schema({
   movieID: {
    type: String,
    required: true
   },
   rating: {
    type: Number,
    required: true
   }
}, 
    { timestamps: true }
);

const UserRateMovie = mongoose.model("User-Movie Rating", UserRateMovieSchema);
export default UserRateMovie;