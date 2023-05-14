import mongoose from "mongoose";

const UserFavouriteMovieSchema = new mongoose.Schema({
   userID: {
    type: String,
    required: true
   },
   movieID: {
    type: String,
    required: true
   },
   media_type: {
    type: String,
    required: true
   }
}, 
    { timestamps: true }
);

const UserFavouriteMovie = mongoose.model("User-Movie Favourite", UserFavouriteMovieSchema);
export default UserFavouriteMovie;