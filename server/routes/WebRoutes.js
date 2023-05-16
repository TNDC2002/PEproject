//  FOLLOW THE NOTE.... Don't touch anything ELSE!!
//  This is router, it use for redirect reqest and response to specific controller


import express from "express";
import * as uploader from "../middleware/FileUploader.js"
//uploader setup
var upload = uploader.default()

/* Import your controller here by syntax:
    import * as <your controller name> from "../controller/<ControllerFile>.js" */
import * as SampleController from "../controller/SampleController.js";
import * as middleware from "../middleware/auth.js";
import * as auth from "../controller/auth.js";
import * as movieAPI from "../controller/movieAPI.js";
import * as user from "../controller/user.js";

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
      router.get("/movie/tvRecommendations/:showID", movieAPI.default.getShowRecommendations);
      router.get("/movie/tvTrailer/:showID", movieAPI.default.getShowTrailerID);
      router.get("/user-search-history/", middleware.default.verifyToken, user.default.fetchSearches);
      router.get("/auth/logout", auth.default.logout);
      router.get("/auth/info", auth.default.GetAUTH);
      router.get('/', SampleController.default.Sample_handler_GET);
  /* POST syntax:
      router.post('<route>',<controller_name>.default.<function>) */
      app.post("/auth/register", upload.single("picture"), auth.default.register);
      router.post("/auth/login", auth.default.login);
      router.post("/movie/favourite", middleware.default.verifyToken, movieAPI.default.favourite);
      router.post("/movie/favourite/check", movieAPI.default.checkFavourite);
      router.post("/movie/rent", middleware.default.verifyToken, movieAPI.default.rent);
      router.post("/movie/rent/check", movieAPI.default.checkRented);
      router.post("/user-search-history/insert", middleware.default.verifyToken, user.default.insertSearch);
      router.post('/', SampleController.default.Sample_handler_POST);
  
  /* PUT syntax:
      router.put('<route>',<controller_name>.default.<function>) */
      router.put('/', SampleController.default.Sample_handler_PUT);

  /* DELETE syntax:
      router.delete('<route>',<controller_name>.default.<function>) */
      router.delete('/', SampleController.default.Sample_handler_DELETE);
  


  // Don't touch anything else
  app.use("/", router);
}

export { initWebRoutes };


