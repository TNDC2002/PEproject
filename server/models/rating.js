import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        console.log(token)
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}
var output = {
    verifyToken
}

export default output;