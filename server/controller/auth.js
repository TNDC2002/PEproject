import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User_Schema.js";
import EmailVerification from "../models/EmailVerification_Schema.js"
import nodemailer from "nodemailer"
import * as dotenv from 'dotenv'
import Verification_model from "../models/Verification_model.js"
dotenv.config()
const expiresIn = (60 * 60) * 7;



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
        const savedUser = await newUser.save();

        Verification_model.sendVerificationEmail(savedUser);

        res.status(201).json(savedUser);

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
};
/* CHECKING EMAIL */
const checkEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const existingUser = await User.findOne({ email });

        res.json({ emailExists: !!existingUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* LOGGING IN */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist." })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn });
        const salt = await bcrypt.genSalt();
        const tokenHash = await bcrypt.hash(token, salt);
        //save token to DB
        let update = await User.findOneAndUpdate({ _id: user._id }, {
            token: tokenHash
        })
            .then((update) => { })
            .catch((error) => {
                console.log("ERROR --- Auth.js --- can't UPDATE token to DB")
            })

        delete user.password;
        const cookieOptions = {
            maxAge: 36000000, // Cookie expiration time (in milliseconds)
            httpOnly: true, // Restrict cookie access to HTTP requests only
            signed: true, // Enable cookie signing
            sameSite: 'Lax'
        };
        res.cookie('token', token, cookieOptions);
        res.status(200).json({ user });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
};

const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).send("deleted");
}
const GetAUTH = async (req, res) => {
    try {
        let token = req.signedCookies.token;
        if (!token) {
            return res.status(200).json({ authenticated: false });
        }
        const UUID = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: UUID.id });
        const isMatch = await bcrypt.compare(token, user.token);
        if (isMatch) {
            console.log("___res true")
            return res.status(200).json({ authenticated: true });
        } else {
            return res.status(200).json({ authenticated: false });
        }

    } catch (err) {
        console.log(err.message)
        res.status(200).json({ error: err.message, authenticated: false });
    }
}

var output = {
    login,
    logout,
    register,
    GetAUTH,
    checkEmail
}

export default output
