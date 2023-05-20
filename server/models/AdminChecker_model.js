import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./User_Schema.js";
import * as dotenv from 'dotenv'
dotenv.config()
const Admin_checker = async (req, res) => {
    try {
        let token = req.signedCookies.token;
        if (!token) {
            return {
                status: 403,
                err: "access denied!"
            }
        }
        const UUID = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: UUID.id });
        const isMatch = await bcrypt.compare(token, user.token);
        if (isMatch && user.isAdmin == true) {
            console.log("___res true")
            return {
                status: 200,
                isAdmin: user.isAdmin
            }
        } else {
            return {
                status: 403,
                err: "access denied!"
            }
        }

    } catch (err) {
        console.log(err.message)
        return {
            status: 500,
            err: err.message
        }
    }
}
const output = {
    isAdmin: Admin_checker
}
export default output;
