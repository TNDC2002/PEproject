import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await User.findOne({
            _id: userID,
        });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}