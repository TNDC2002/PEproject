import jwt from "jsonwebtoken";
import User from "../models/User.js"
import bcrypt from "bcrypt";
export const verifyToken = async (req, res, next) => {
    try {
        console.log("____________verify___________")
        let token = req.signedCookies.token;
        console.log("token:",token)
        const user = await User.findOne({ token: token });
        if (!token) {
            console.log("Access Denied")
            return res.status(403).send("Access Denied");
        }else if(!user){
            console.log("Someone try to fuck up the AUTHENTICATE mechanism")
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        console.log(token)
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
}
var output = {
    verifyToken
}

export default output;