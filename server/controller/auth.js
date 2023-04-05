import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import EmailVerification from "../models/EmailVerification.js"
import nodemailer from "nodemailer"
import * as dotenv from 'dotenv'
dotenv.config()
import { v4 as uuidv4 } from 'uuid';
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
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath
        } = req.body;
        
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
//send email detail
const sendVerificationEmail = ({_id,email},res) =>{
    const currentUrl = "http://localhost:5000";
    const uniqueString = uuidv4() + _id;
    const mailOption = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your Email",
        html: `<p>Verify your email address to complete the signup and login to ypur account.</p><p>This link 
        <b>expires in 6 hours</b>.</p><p>Press <a hresf=${currentUrl + "user/verify/" + _id + "/" + uniqueString}>
        here</a> to proceed.</p>`
    }

//save to DB
const saltRounds = 10;
bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
        const newVerification = new EmailVerification({
            email: _id,
            verificationString: hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000,
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
                res.json({
                    status: "FAILED",
                    message: "Verification of email failed..."
                });
            })
        })
        .catch((error) => {
            console.log(error);
            res.json({
                status: "FAILED",
                message: "Couldn't save verification email data..."
            });
        })
    })
    .catch(()=>{
        res.json({
            status: "FAILED",
            message: "An error occured while hashing email data..."
        });
    })
};



export const verify = async (req,res) =>{
    try{
        let {userId, uniqueString} = req.params;

        EmailVerification.find(userId)
        .then()
        .catch((error)=>{
            console.log(error);
        })
    }catch(error){
        
    }
}
    /* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email:email });
        if (!user) return res.status(400).json({ msg: "User does not exist."});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials."})

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};