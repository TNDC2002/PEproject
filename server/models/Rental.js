import UserMovieRental from "./UserRentMovie.js"


const GET_rental = async (req) => {
    try {
        const { userID, movieID } = req.body
        const RATE = await UserMovieRental.findOne({ userID: userID, movieID: movieID })
        if (RATE.userID) {
            return RATE;
        } else {
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

const POST_rental = async (req) => {
    try {
        let { userID, movieID, Duration } = req.body
        Duration = Number(Duration)
        let BeginDate = new Date();
        let ExpireDate = new Date();
        ExpireDate.setDate(ExpireDate.getDate() + Duration);
        const newrental = new UserMovieRental({
            userID: userID,
            movieID: movieID,
            rentalBeginDate: BeginDate,
            rentalExpireDate: ExpireDate
        });
        newrental.save()
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
        const { userID, movieID, Duration } = req.body
        let Rated = await UserMovieRental.findOneAndUpdate({
            userID: userID,
            movieID: movieID
        }, {
            rental: rental
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
        const { userID, movieID } = req.body
        let Rated = {
            userID: userID,
            movieID: movieID
        }
        console.log("-----------------------------------------------")
        UserMovieRental.findOneAndRemove(Rated)
            .then((deletedUser) => {
                if (deletedUser) {
                    console.log('NOTIFI --- rental.js --- Rate has been deleted!');
                } else {
                    console.log('ERROR --- rental.js --- Rate matching the conditions was not found.');
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