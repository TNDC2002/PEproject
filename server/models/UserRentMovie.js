import mongoose from "mongoose";

const UserMovieRentalSchema = new mongoose.Schema({
   userID: {
    type: String,
    required: true
   },
   movieID: {
    type: String,
    required: true
   },
   rentalBeginDate: {
    type: Date,
    required: true
   },
   rentalExpireDate: {
    type: Date,
    required: true
   }
}, 
    { timestamps: true }
);

const UserMovieRental = mongoose.model("User-Movie Rental", UserMovieRentalSchema);
export default UserMovieRental;