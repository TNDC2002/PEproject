import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import EmailVerification from "../models/EmailVerification.js"
import nodemailer from "nodemailer"
import * as dotenv from 'dotenv'
dotenv.config()
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
//transporter stuff
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    }
})
//test transporter
transporter.verify((error, success) => {
    if(error){
        console.log(error);
    }else {
        console.log("Ready for messages");
        console.log(success);
    }
})

/* REGISTER USER */
const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath
        } = req.body;
        console.log(req.body);
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath
        })
        const savedUser = await newUser.save().then((result)=>{
            sendVerificationEmail(result,res);
        });
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

let generateRandomNumber = () =>{
    // Generate a random number between 0 and 999999
        const randomNumber = Math.floor(Math.random() * 1000000);
    
    // Pad the number with leading zeros to ensure it has 6 digits
        const paddedNumber = String(randomNumber).padStart(6, '0');
        return paddedNumber;
    } 

//send email detail
const sendVerificationEmail = ({email},res) =>{
    const verifyPIN = generateRandomNumber();
    const mailOption = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your Email",
        text: `Verify your email address to complete the signup and login to your account.
        This code expires in 6 hours.
        The code is: ${verifyPIN}`
    }

//save to DB
    const newVerification = new EmailVerification({
        email: email,
        verificationString: verifyPIN,
        createdAt: Date.now(),
    });
    newVerification.save()
    .then(()=>{
        transporter.sendMail(mailOption)
        .then(()=>{
            res.json({
                status: "PENDING",
                message: "Verification email sent!"
            });
        })
        .catch((error)=>{
            // res.json({
            //     status: "FAILED",
             //     message: "Verification of email failed..."
            // });
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

//export
const verify = async (req,res) =>{
    try{
        let {userId, verifyPIN} = req.params;

        EmailVerification.find(userId)
        .then((result) => {
            if(!result){
                let message = "Link has expired, account does not exist or have registered already! Please try again";
                res.redirect(`/user/verified/error=true&message=${message}`);

            }else{
                //valid user exists
                //compare
                const savedVerifyPIN = result[0].verificationString;
                if(savedVerifyPIN==verifyPIN){
                    User.updateOne({_id: userId},{verified: true})
                    .catch((error)=>{
                        console.log(error);
                        let message = "An error occured while updating records";
                        res.redirect(`/user/verified/error=true&message=${message}`);
                    })
                }else{
                    let message = "invalid code, please try again!";
                    res.redirect(`/user/verified/error=true&message=${message}`);
                }                    
            }
    })
    .catch((error)=>{
        console.log(error);
        let message = "An error occured when checking for existing user verification record";
        res.redirect(`/user/verified/error=true&message=${message}`);
    })
    }catch(error){
        console.log(error);
    }
}

const verified = async(req,res) =>{
    try{
        res.sendfile.join(__dirname, "./../views/verified.html");
    } catch(err)
    {}
}

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email:email });
        if (!user) return res.status(400).json({ msg: "User does not exist."})

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials."})

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        console.log("token before sent: ", token)
        console.log("USER ID: ", user._id)
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

var output = {
    verify,
    verified,
    login,
    register
}

export default output
/* CHECKING EMAIL */
export const checkEmail = async (req, res) => {
    try {
      const { email } = req.params;

      const existingUser = await User.findOne({ email });
      
      res.json({ emailExists: !!existingUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };