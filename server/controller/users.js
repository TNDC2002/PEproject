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

export const updateUserProfile = async (req, res) => {
    const { userID } = req.params;
    const user = await User.findOne({
        _id: userID,
    });

    console.log(req.body);

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
        })
    }
    else {
        res.status(404).json({ message: err.message });
    }
}