//  FOLLOW THE NOTE.... Don't touch anything ELSE!!
//  This is router, it use for redirect reqest and response to specific controller

import express from "express";
import * as uploader from "../middleware/FileUploader.js";
import User from "../models/User.js";
import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github";
import { Strategy as TwitterStrategy } from "passport-twitter";
//uploader setup
var upload = uploader.default();
//Passport setup
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const GgId = profile.id;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const email = profile.emails[0].value;
      const picturePath = profile.photos[0].value;
      try {
        let data = {
          firstName,
          lastName,
          email,
          picturePath,
          GgId,
        };
        let user = null;
        user = await User.findOne(data);
        if (user) {
          done(null, { id: GgId });
        } else {
          console.log("_____________________________________________________");
          console.log(data);
          const newUser = new User(data);
          const savedUser = await newUser.save();
          done(null, { id: GgId });
        }
      } catch (error) {
        console.log("___________________________________________________");
        console.log(error);
      }
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
        FbId,
      });
      const savedUser = newUser.save();
      done(null, { id: FbId });
    }
  )
);
passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const GhId = profile.id;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const email = profile.emails[0].value;
      const picturePath = profile.photos[0].value;
      const newUser = new User({
        firstName,
        lastName,
        email,
        picturePath,
        GhId,
      });
      const savedUser = newUser.save();
      done(null, { id: GhId });
    }
  )
);

passport.use(
  "twitter",
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_KEY, // Replace with your Twitter consumer key
      consumerSecret: process.env.TWITTER_SECRET, // Replace with your Twitter consumer secret
      callbackURL: "/auth/twitter/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const TwId = profile.id;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const email = profile.emails[0].value;
      const picturePath = profile.photos[0].value;
      const newUser = new User({
        firstName,
        lastName,
        email,
        picturePath,
        TwId,
      });
      const savedUser = newUser.save();
      done(null, { id: TwId });
    }
  )
);
passport.serializeUser((user, done) => {
  // Serialize the user object to store in the session
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Retrieve the user object from the session using the serialized id
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/* Import your controller here by syntax:
    import * as <your controller name> from "../controller/<ControllerFile>.js" */
import * as SampleController from "../controller/SampleController.js";
import * as middleware from "../middleware/auth.js";
import * as auth from "../controller/auth.js";
import * as movieAPI from "../controller/movieAPI.js";
import * as user from "../controller/user.js";
import * as oAuth2 from "../controller/oAuth2_Controller.js";

let router = express.Router();

let initWebRoutes = (app) => {
  /* rest API:
                  method get khi lấy data
                  method Post khi create
                  method Put để cập nhật
                  method delete để xóa
      */

  // Assign a URL route for it by:
  /* GET syntax:
        router.get('<route>',<controller_name>.default.<function>) */
  router.get("/auth/verified", auth.default.verified);
  router.get("/auth/verify/:userId/:uniqueString", auth.default.verify);
  router.get("/movie/detail/:movieID", movieAPI.default.getDetail);
  router.get("/movie/trailer/:movieID", movieAPI.default.getTrailerID);
  router.get(
    "/movie/recommendations/:movieID",
    movieAPI.default.getRecommendations
  );
  router.get("/movie/tvDetail/:showID", movieAPI.default.getShowDetail);
  router.get(
    "/movie/tvRecommendations/:showID",
    movieAPI.default.getShowRecommendations
  );
  router.get("/movie/tvTrailer/:showID", movieAPI.default.getShowTrailerID);
  router.get(
    "/user-search-history/",
    middleware.default.verifyToken,
    user.default.fetchSearches
  );
  router.get("/auth/logout", auth.default.logout);
  router.get("/auth/info", auth.default.GetAUTH);
  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "http://localhost:5173/home", // Redirect to /home if successful
      failureRedirect: "http://localhost:5173/", // Redirect to / if unsuccessful
    })
  );
  router.get("/login/google", oAuth2.default.GG_oAuth2);
  router.get("/login/facebook", oAuth2.default.FB_oAuth2);
  router.get("/auth/github", passport.authenticate("github"));
  router.get(
    "/auth/github/callback",
    passport.authenticate("github", {
      successRedirect: "http://localhost:5173/auth/github",
      failureRedirect: "http://localhost:5173/",
    })
  );
  router.get("/login/github", oAuth2.default.GH_oAuth2);
  router.get("/auth/twitter", passport.authenticate("twitter"));
  router.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
      successRedirect: "http:/0localhost:5173/auth/twitter",
      failureRedirect: "http://localhost:5173/",
    })
  );
  router.get("/login/twitter", oAuth2.default.TW_oAuth2);

  router.get("/", SampleController.default.Sample_handler_GET);
  /* POST syntax:
        router.post('<route>',<controller_name>.default.<function>) */
  app.post("/auth/register", upload.single("picture"), auth.default.register);
  router.post("/auth/login", auth.default.login);
  router.post(
    "/movie/favourite",
    middleware.default.verifyToken,
    movieAPI.default.favourite
  );
  router.post("/movie/favourite/check", movieAPI.default.checkFavourite);
  router.post(
    "/movie/rent",
    middleware.default.verifyToken,
    movieAPI.default.rent
  );
  router.post("/movie/rent/check", movieAPI.default.checkRented);
  router.post(
    "/user-search-history/insert",
    middleware.default.verifyToken,
    user.default.insertSearch
  );
  router.post("/", SampleController.default.Sample_handler_POST);

  /* PUT syntax:
        router.put('<route>',<controller_name>.default.<function>) */
  router.put("/", SampleController.default.Sample_handler_PUT);

  /* DELETE syntax:
        router.delete('<route>',<controller_name>.default.<function>) */
  router.delete("/", SampleController.default.Sample_handler_DELETE);

  // Don't touch anything else
  app.use("/", router);
};

export { initWebRoutes };
