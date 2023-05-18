//  FOLLOW THE NOTE.... Don't touch anything ELSE!!
//  This is router, it use for redirect reqest and response to specific controller


import express from "express";
import * as uploader from "../middleware/FileUploader.js"
//uploader setup
var upload = uploader.default()


/* Import your controller here by syntax:
import * as <your controller name> from "../controller/<ControllerFile>.js" */
import { getUser, updateUserProfile } from "../controller/user.js";
import { verifyToken } from "../middleware/auth.js";
import * as SampleController from "../controller/SampleController.js";
import * as middleware from "../middleware/auth.js";
import * as auth from "../controller/auth.js";
import * as movieAPI from "../controller/movieAPI.js";
import * as user from "../controller/user.js";
import * as Rate from "../controller/UserRateMovie_Controller.js"
import * as Rental from "../controller/UserRentMovie_Controller.js"
import * as Favourite from "../controller/UserFavouriteMovie_Controller.js"
import * as History from "../controller/UserSearchHistory_Controller.js"

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
  router.get("/movie/recommendations/:movieID", movieAPI.default.getRecommendations);
  router.get("/movie/tvDetail/:showID", movieAPI.default.getShowDetail);
  router.get("/movie/credits/:movieID", movieAPI.default.getMovieCredits);
  router.get("/movie/credits/:showID", movieAPI.default.getShowCredits);
  router.get("/movie/tvRecommendations/:showID", movieAPI.default.getShowRecommendations);
  router.get("/movie/tvTrailer/:showID", movieAPI.default.getShowTrailerID);
  router.get("/movie/showTrailer/:showId", movieAPI.default.getShowTrailerID);
  router.get("/movie/discovery/:page", movieAPI.default.getMovieDiscovery);
  router.get("/movie/showDiscovery/:page", movieAPI.default.getShowDiscovery);
  router.get("/search", movieAPI.default.fetchSearchResult);
  router.get("/user/:userID/favourite", user.default.fetchFavourites);
  router.get("/movie/featureImage", movieAPI.default.getImageCarousel);
  /* MONGOL API ROUTE */
  router.get("/api/rate/check", Rate.default.GET_handler);
  router.get("/api/favourite/check", Favourite.default.GET_handler);
  router.get("/api/history/get", History.default.GET_handler);

  /* POST syntax:
      router.post('<route>',<controller_name>.default.<function>) */
  app.post("/auth/register", upload.single("picture"), auth.default.register);
  router.post("/auth/login", auth.default.login);

  /* MONGOL API ROUTE */
  router.post("/api/history/insert", History.default.POST_handler);
  router.post("/api/rate/insert", Rate.default.POST_handler);
  router.post("/api/favourite/insert", Favourite.default.POST_handler);


  /* PUT syntax:
      router.put('<route>',<controller_name>.default.<function>) */

  /* MONGOL API ROUTE */
  router.put("/api/history/update", History.default.PUT_handler);
  router.put("/api/rate/update", Rate.default.PUT_handler);
  router.get("/:userID", verifyToken, getUser);
  router.put("/:userID", verifyToken, updateUserProfile);

  /* DELETE syntax:
      router.delete('<route>',<controller_name>.default.<function>) */

  /* MONGOL API ROUTE */
  router.delete("/api/rate/delete", Rate.default.DELETE_handler);
  router.delete("/api/favourite/delete", Favourite.default.DELETE_handler);

  // Don't touch anything else
  app.use("/", router);
}

export { initWebRoutes };


