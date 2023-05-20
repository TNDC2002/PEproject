import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User_Schema.js";
import * as dotenv from 'dotenv'
dotenv.config()
const Admin_checker = async (req, res) => {
    try {
        let token = req.signedCookies.token;
        if (!token) {
            return res.status(200).json({ authenticated: false });
        }
        const UUID = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: UUID.id });
        const isMatch = await bcrypt.compare(token, user.token);
        if (isMatch && user.isAdmin == true) {
            console.log("___res true")
            return res.status(200).json({ isAdmin: true });
        } else {
            return res.status(200).json({ isAdmin: false });
        }

    } catch (err) {
        console.log(err.message)
        res.status(200).json({ error: err.message, authenticated: false });
    }
}
const output = {
    Admin_checker
}
export default output;
