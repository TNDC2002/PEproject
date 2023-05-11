import UserRateMovie from "./UserRateMovie.js"
import MovieRating from "./MovieRatingSchema.js"

const calc = (movieID, rating, weight) => {
    try {
        let Rated = MovieRating.findOne({
            movieID: movieID,
            rating: rating
        });
        let rate = (Rated.rating * Rated.weight + rating * weight)/(Rated.weight + weight)

        Rated.save()
            .then(() => {
            })
            .catch((error) => {
                console.log("ERROR --- Rating.js --- can't UPDATE to DB")
            })

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}

const GET_rating = async (req) => {
    try {
        const { userID, movieID } = req.body


    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}

const POST_rating = async (req) => {
    try {
        const { userID, movieID, rating } = req.body

        const newRating = new UserRateMovie({
            userID: userID,
            movieID: movieID,
            rating: rating,
        });
        newRating.save()
            .then(() => {
                
            })
            .catch((error) => {
                console.log("ERROR --- Rating.js --- can't SAVE to DB")
            })

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const PUT_rating = async (req) => {
    try {
        const { userID, movieID, rating } = req.body
        let Rated = await UserRateMovie.findOne({
            userID: userID,
            movieID: movieID
        });
        Rated = {
            userID: userID,
            movieID: movieID,
            rating: rating
        }
        Rated.save()
            .then(() => {
            })
            .catch((error) => {
                console.log("ERROR --- Rating.js --- can't UPDATE to DB")
            })

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const DELETE_rating = async (req) => {
    try {
        const { userID, movieID } = req.body
        let Rated = await UserRateMovie.findOne({
            userID: userID,
            movieID: movieID
        });
        UserRateMovie.findOneAndRemove(Rated)
            .then((deletedUser) => {
                if (deletedUser) {
                    console.log('NOTIFI --- Rating.js --- Rate has been deleted!');
                } else {
                    console.log('ERROR --- Rating.js --- Rate matching the conditions was not found.');
                }
            })
            .catch((error) => {
                console.log("ERROR --- Rating.js --- can't DELETE to DB")
            })

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
var output = {
    POST: POST_rating,
    PUT: PUT_rating,
    DELETE: DELETE_rating
};
export default output;