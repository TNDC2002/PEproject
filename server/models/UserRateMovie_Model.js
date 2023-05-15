import UserRateMovie from "./UserRateMovie_Schema.js"


const GET_rating = async (req) => {
    try {
        const { userID, movieID, media_type } = req.body;
        const Rate = await UserRateMovie.findOne({ userID: userID, movieID:movieID, media_type: media_type })
        if (Rate.userID){
            return Rate;
        }else{
            return {
                status: 500,
                error: "not found"
            }
        }
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}

const POST_rating = async (req) => {
    try {
        const { userID, movieID, rating, media_type } = req.body;

        const newRating = new UserRateMovie({
            userID: userID,
            movieID: movieID,
            rating: rating,
            media_type: media_type
        });
        newRating.save()
            .then(async () => {
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
        const { userID, movieID, rating, media_type } = req.body
        let Rated = await UserRateMovie.findOneAndUpdate({
            userID: userID,
            movieID: movieID,
            media_type: media_type
        },{
            rating:rating
        })
        .then(()=>{})
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
        const { userID, movieID, media_type } = req.body
        let Rated = {
            userID: userID,
            movieID: movieID,
            media_type: media_type
        }
        console.log("-----------------------------------------------")
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
    GET: GET_rating,
    POST: POST_rating,
    PUT: PUT_rating,
    DELETE: DELETE_rating
};

export default output;