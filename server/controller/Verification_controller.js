
import User from "../models/User_Schema.js";
import EmailVerification from "../models/EmailVerification_Schema.js"
import * as dotenv from 'dotenv'
dotenv.config()

const verify = async (req, res) => {
    try {
        let { email, verifyPIN } = req.body;

        EmailVerification.find({email: email})
            .then((result) => {
                if (!result) {
                    let message = "Link has expired, account does not exist or have registered already! Please try again";
                    res.status(500).json({err: message});
                } else {
                    //valid user exists
                    //compare
                    const savedVerifyPIN = result[0].verificationString;
                    if (savedVerifyPIN == verifyPIN) {
                        User.updateOne({ email: email }, { verified: true })
                            .then(()=>{
                                res.status(200);
                            })
                            .catch((error) => {
                                console.log(error);
                                let message = "An error occured while updating records";
                                res.status(500).json({err: message});
                            })
                            res.status(200);
                    } else {
                        let message = "invalid code, please try again!";
                        res.status(500).json({err: message});
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                let message = "An error occured when checking for existing user verification record";
                res.redirect(`/user/verified/error=true&message=${message}`);
            })
    } catch (error) {
        console.log(error);
    }
}
var output = {
    verify
}
export default output