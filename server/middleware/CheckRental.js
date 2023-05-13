export const verifyToken = async (req, res, next) => {
    try {
        if(!token) {
            return res.status(403).send("Access Denied");
        }
        next();
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}
var output = {
    verifyToken
}

export default output;