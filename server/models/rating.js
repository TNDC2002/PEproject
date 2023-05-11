import UserRateMovie from "../models/UserRateMovie"


/* INSERT USER SEARCH STRING */
const rating = async (req, res) => {
    try {
        const {userID, movieID, rating} = req.body
        

    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


var output = {
    rating
};
export default output;