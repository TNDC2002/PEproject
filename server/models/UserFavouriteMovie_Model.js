import UserFavouriteMovie from "./UserFavouriteMovie_Schema.js";


const GET_favourite = async (req) => {
    try {
        const { userID, movieID, media_type, season } = req.query;
        const Favourite = await UserFavouriteMovie.findOne({ userID: userID, movieID:movieID, media_type: media_type, season: season });
        return { favorited: Favourite !== null };
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}

const POST_favourite = async (req) => {
    try {
        const { userID, movieID, media_type, season } = req.body;

        const newFavourite = new UserFavouriteMovie({
            userID: userID,
            movieID: movieID,
            media_type: media_type,
            season: season
        });
        newFavourite.save()
            .then(async () => {
            })
            .catch((error) => {
                console.log("ERROR --- Favourite.js --- can't SAVE to DB")
            })
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const PUT_favourite= async (req) => {
    try {
        
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const DELETE_favourite= async (req) => {
    try {
        const { userID, movieID, media_type, season } = req.body
        let Favourited = {
            userID: userID,
            movieID: movieID,
            media_type: media_type,
            season: season
        }
        console.log("-----------------------------------------------")
        UserFavouriteMovie.findOneAndRemove(Favourited)
            .then((deletedUser) => {
                if (deletedUser) {
                    console.log('NOTIFI --- Favourite.js --- Rate has been deleted!');
                } else {
                    console.log('ERROR --- Favourite.js --- Rate matching the conditions was not found.');
                }
            })
            .catch((error) => {
                console.log("ERROR --- Favourite.js --- can't DELETE to DB")
            })

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
var output = {
    GET: GET_favourite,
    POST: POST_favourite,
    PUT: PUT_favourite,
    DELETE: DELETE_favourite
};
export default output;