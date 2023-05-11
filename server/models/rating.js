import UserRateMovie from "../models/UserRateMovie"


/* INSERT USER SEARCH STRING */
const rating = async (req, res) => {
    try {
        const {userID, movieID, rating} = req.body
        
        const newRating = new UserRateMovie({
            userID: userID,
            movieID: movieID,
            rating: rating,
        });
        newRating.save()
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
                res.json({
                    status: "FAILED",
                    message: "Couldn't save rating data..."
                });
            })
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


var output = {
    rating
};
export default output;