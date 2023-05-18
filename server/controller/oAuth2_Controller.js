import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import oAuth2 from '../models/oAuth2_model.js'
import * as dotenv from 'dotenv';
dotenv.config()

// Google authentication route
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google authentication callback route
app.get("/auth/google/callback", passport.authenticate("google", { successRedirect: "/", failureRedirect: "/login" }),oAuth2.Gg_Callback);
const oAuth2 = async (req, res) => {
    let Rating_return = await Rating.default.GET(req)
    if (Rating_return.status) {
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }else{
        return res.status(200).json({ Rating_return });
    }
}

// Facebook authentication route
app.get("/auth/facebook", passport.authenticate("facebook"));

// Facebook authentication callback route
app.get("/auth/facebook/callback", passport.authenticate("facebook", { successRedirect: "/", failureRedirect: "/login" }),oAuth2.Fb_Callback);
