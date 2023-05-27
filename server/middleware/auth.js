import jwt from "jsonwebtoken";
import User from "../models/User_Schema.js"
import bcrypt from "bcrypt";
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.signedCookies.token;
        const UUID = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: UUID.id });
        const isMatch = await bcrypt.compare(token, user.token);
        if (isMatch) {
            req.user = UUID;
            next();
        } else {
            console.log("Access Denied")
            return res.status(403).send("Access Denied");
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
}
var output = {
    verifyToken
}

export default output;