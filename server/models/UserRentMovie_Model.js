import UserMovieRental from "./UserRentMovie_Schema.js"
import axios from "axios"

const GET_rental = async (req) => {
    try {
        const { userID, movieID, media_type, season } = req.query;
        const Rent = await UserMovieRental.findOne({ userID: userID, movieID: movieID, media_type: media_type, season: season })
        
        return {Rented: Rent !== null,
                    Rental_information: Rent};

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}

const POST_rental = async (req) => {
    try {
        let { userID, movieID, media_type, Duration, season } = req.body
        Duration = Number(Duration)
        let BeginDate = new Date();
        let ExpireDate = new Date();
        ExpireDate.setDate(ExpireDate.getDate() + Duration);
        const newRent = new UserMovieRental({
            userID: userID,
            movieID: movieID,
            rentalBeginDate: BeginDate,
            rentalExpireDate: ExpireDate,
            media_type: media_type,
            season: season
        });
        newRent.save()
            .then(async () => {
            })
            .catch((error) => {
                console.log("ERROR --- rental.js --- can't SAVE to DB")
            })

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}

const PUT_rental = async (req) => {
    try {
        let { userID, movieID, media_type, Duration, season } = req.body;
        Duration = Number(Duration);
        const Rented = await UserMovieRental.findOne({ userID: userID, movieID: movieID, media_type: media_type, season: season });
        Rented.rentalExpireDate.setDate(Rented.rentalExpireDate.getDate() + Duration);

        let updatedRented = await UserMovieRental.findOneAndUpdate({
            userID: userID,
            movieID: movieID,
            media_type: media_type,
            season: season
        }, {
            rentalExpireDate: Rented.rentalExpireDate
        })
            .then(() => { })
            .catch((error) => {
                console.log("ERROR --- rental.js --- can't UPDATE to DB")
            })


    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}

const DELETE_rental = async (req) => {
    try {
        const { userID, movieID, media_type, season } = req.body
        let Rented = {
            userID: userID,
            movieID: movieID,
            media_type: media_type,
            season: season
        }
        console.log("-----------------------------------------------")
        UserMovieRental.findOneAndRemove(Rented)
            .then((deletedUser) => {
                if (deletedUser) {
                    console.log('NOTIFI --- rental.js --- Rental has been deleted!');
                } else {
                    console.log('ERROR --- rental.js --- Rental matching the conditions was not found.');
                }
            })
            .catch((error) => {
                console.log("ERROR --- rental.js --- can't DELETE to DB")
            })

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
var output = {
    GET: GET_rental,
    POST: POST_rental,
    PUT: PUT_rental,
    DELETE: DELETE_rental
};
export default output;