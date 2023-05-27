import MovieAvailability from "./MovieAvailability_Schema.js";


const GET_available = async (req) => {
    try {
        const { movieID, media_type, season } = req.query;
        const Available = await MovieAvailability.findOne({ movieID:movieID, media_type: media_type, season: season });
        return { available: Available !== null };
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}

const POST_available = async (req) => {
    try {
        const { movieID, media_type, season } = req.body;

        const newAvailable = new MovieAvailability({
            movieID: movieID,
            media_type: media_type,
            season: season,
        });
        newAvailable.save()
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
const PUT_available= async (req) => {
    try {
        
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const DELETE_available= async (req) => {
    try {
        const { movieID, media_type, season } = req.body
        let available = {
            movieID: movieID,
            media_type: media_type,
            season: season
        }
        console.log("-----------------------------------------------")
        MovieAvailability.findOneAndRemove(available)
            .then((deletedAvailability) => {
                if (deletedAvailability) {
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
    GET: GET_available,
    POST: POST_available,
    PUT: PUT_available,
    DELETE: DELETE_available
};
export default output;