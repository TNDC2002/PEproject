import UserFavouriteMovie from "./UserFavouriteMovie_Schema";


const GET_favourite = async (req) => {
    try {
        const { userID, movieID, media_type } = req.body;
        const Favourite = await UserFavouriteMovie.findOne({ userID: userID, movieID:movieID, media_type: media_type });
        if (Favourite.userID){
            return Favourite;
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

const POST_favourite = async (req) => {
    try {
        const { userID, movieID, media_type } = req.body;
        const newFavourite = new UserFavouriteMovie({
            userID: userID,
            movieID: movieID,
            media_type: media_type
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
        const { userID, movieID, media_type } = req.body
        let Favourited = {
            userID: userID,
            movieID: movieID,
            media_type: media_type
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