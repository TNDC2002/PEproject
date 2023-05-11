import UserRateMovie from "../models/UserRateMovie"


/* INSERT USER SEARCH STRING */
const rating = async (req, res) => {
    try {
        const {userID, movieID, rating} = req.body
        
        const newVerification = new UserRateMovie({
            userID: userID,
            movieID: movieID,
            rating: rating,
        });
        newVerification.save()
            .then(() => {
                transporter.sendMail(mailOption)
                    .then(() => {
                        res.json({
                            status: "PENDING",
                            message: "Verification email sent!"
                        });
                    })
                    .catch((error) => {
                    })
            })
            .catch((error) => {
                console.log(error);
                res.json({
                    status: "FAILED",
                    message: "Couldn't save verification email data..."
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