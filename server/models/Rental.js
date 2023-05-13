import UserMovieRental from "./UserRentMovie.js"
import axios from "axios"

const GET_rental = async (req) => {
    try {
        const { userID, movieID } = req.body
        const Rental = await UserMovieRental.findOne({ userID: userID, movieID: movieID })
        let today = new Date();
        if (Rental.rentalExpireDate && Rental.rentalExpireDate > today) {
            return Rental;
        } else if (Rental.rentalExpireDate && Rental.rentalExpireDate <= today) {
            
            console.log("________AUTO DELETE____________")
            let url = "http://localhost:" + process.env.PORT + "/api/rent"

            axios.delete(url, {
                headers: {
                    // 'Content-Type': 'application/json',
                },
                data: { userID: userID, movieID: movieID }
            })
                .then(response => {
                    return response
                })
                .catch(error => {
                });

        } else {
            console.log("________WTF____________")
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
        let { userID, movieID, Duration } = req.body
        Duration = Number(Duration)
        const Rental = await UserMovieRental.findOne({ userID: userID, movieID: movieID })
        Rental.rentalExpireDate.setDate(Rental.rentalExpireDate.getDate() + Duration);

        let UpdateRental = await UserMovieRental.findOneAndUpdate({
            userID: userID,
            movieID: movieID
        }, {
            rentalExpireDate: Rental.rentalExpireDate
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
        let Rental = {
            userID: userID,
            movieID: movieID
        }
        console.log("-----------------------------------------------")
        UserMovieRental.findOneAndRemove(Rental)
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