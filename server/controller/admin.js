import UserMovieRental from "../models/UserRentMovie_Schema.js";
import User from "../models/User_Schema.js";

export const getUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

