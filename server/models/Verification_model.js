
import EmailVerification from "../models/EmailVerification_Schema.js"
import nodemailer from "nodemailer"
import * as dotenv from 'dotenv'
dotenv.config()
//transporter stuff
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    }
})

let generateRandomNumber = () => {
    // Generate a random number between 0 and 999999
    const randomNumber = Math.floor(Math.random() * 1000000);

    // Pad the number with leading zeros to ensure it has 6 digits
    const paddedNumber = String(randomNumber).padStart(6, '0');
    return paddedNumber;
}

//send email detail
const sendVerificationEmail = ({ email }, res) => {
    const verifyPIN = generateRandomNumber();
    const mailOption = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your Email",
        text: `Verify your email address to complete the signup and login to your account.
        This code expires in 24 hours.
        The code is: ${verifyPIN}`
    }

    //save to DB
    const newVerification = new EmailVerification({
        email: email,
        verificationString: verifyPIN,
        createdAt: Date.now(),
    });
    newVerification.save()
        .then(() => {
            transporter.sendMail(mailOption)
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
            res.json({
                status: "FAILED",
                message: "Couldn't save verification email data..."
            });
        })
};
const output = {
    sendVerificationEmail
}
export default output;