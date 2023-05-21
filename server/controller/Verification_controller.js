
import User from "../models/User_Schema.js";
import EmailVerification from "../models/EmailVerification_Schema.js"
import * as dotenv from 'dotenv'
dotenv.config()

const verify = async (req, res) => {
    try {
        let { email, verifyPIN } = req.body;
        const Verification_data = await EmailVerification.findOne({ email });
        
        if (!Verification_data) {
            let message = "Link has expired, account does not exist or have registered already! Please try again";
            res.status(500).json({ err: message });
        } else {
            //valid user exists
            //compare
            const savedVerifyPIN = Verification_data.verificationString;
            if (savedVerifyPIN == verifyPIN) {
                try {
                    let update = await User.findOneAndUpdate({ email: email }, {
                        verified: true
                    })
                        .then ((update) => { console.log(update)})
                        .catch((error) => {
                            console.log(error);
                        })
                    res.status(200).json({verified: true});
                } catch (error) {
                    res.status(500).json({ err: error.message });
                }
            } else {
                let message = "invalid code, please try again!";
                res.status(500).json({ err: message });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message });
    }
}
var output = {
    verify
}
export default output