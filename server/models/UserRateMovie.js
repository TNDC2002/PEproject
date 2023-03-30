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
    type: Int16Array,
    required: true
   }
}, 
    { timestamps: true }
);

const UserRateMovie = mongoose.model("User-Movie Rental", UserRateMovieSchema);
export default UserRateMovie;