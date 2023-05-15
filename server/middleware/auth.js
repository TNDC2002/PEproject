import jwt from "jsonwebtoken";
import { sign, unsign } from 'cookie-signature';
export const verifyToken = async (req, res, next) => {
    try {
        console.log("____________verify___________")
        let token = req.headers.cookie
        token = unsign(token, process.env.Cookie_secret);
        console.log("mytoken:",token)

        if(!token) {
            return res.status(403).send("Access Denied");
        }
        
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
}
var output = {
    verifyToken
}

export default output;