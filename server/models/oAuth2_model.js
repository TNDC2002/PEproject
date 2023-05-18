
import User from "../models/User.js";
import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { Strategy as FacebookStrategy } from "passport-facebook";
passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: process.env.GG_Client_ID,
            clientSecret: process.env.GG_Client_secret,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            const GgId = profile.id;
            const firstName = profile.name.givenName;
            const lastName = profile.name.familyName;
            const email = profile.emails[0].value;
            const picturePath = profile.photos[0].value;
            const newUser = new User({
                firstName,
                lastName,
                email,
                picturePath,
                GgId
            })
            const savedUser = newUser.save();
            done(null, { id: GgId });

        }
    )
);
passport.use(
    "facebook",
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "/auth/facebook/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            const FbId = profile.id;
            const firstName = profile.name.givenName;
            const lastName = profile.name.familyName;
            const email = profile.emails[0].value;
            const picturePath = profile.photos[0].value;
            const newUser = new User({
                firstName,
                lastName,
                email,
                picturePath,
                FbId
            })
            const savedUser = newUser.save();
            done(null, { id: FbId });

        }
    )
);
