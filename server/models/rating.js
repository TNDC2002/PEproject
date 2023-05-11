import UserRateMovie from "../models/UserRateMovie"


/* INSERT USER SEARCH STRING */
const POST_rating = async (req, res) => {
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
                console.log("ERROR --- Rating.js --- can't save to DB")
            })
    
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }
        
    }
}
const PUT_rating = async (req, res) => {
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
                console.log("ERROR --- Rating.js --- can't save to DB")
            })
    
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }
        
    }
}

var output = {
    POST: POST_rating
};
export default output;