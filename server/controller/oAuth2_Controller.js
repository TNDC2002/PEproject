import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import * as dotenv from 'dotenv';
dotenv.config()

// Google authentication route
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google authentication callback route
app.get("/auth/google/callback", passport.authenticate("google", { successRedirect: "/", failureRedirect: "/login" }));

// Facebook authentication route
app.get("/auth/facebook", passport.authenticate("facebook"));

// Facebook authentication callback route
app.get("/auth/facebook/callback", passport.authenticate("facebook", { successRedirect: "/", failureRedirect: "/login" }));
