import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const user = await User.findOne({
            _id: id,
        });
        res.status(200).json(user);
        console.log(user); // log user data to console
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}