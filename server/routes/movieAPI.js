import express from "express";
import { favourite, checkFavourite, getDetail, getTrailerID, getRecommendations, getShowDetail, getShowRecommendations, checkRented, rent } from "../controller/movieAPI.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/favourite", verifyToken, favourite);
router.post("/favourite/check", checkFavourite);
router.post("/rent", verifyToken, rent);
router.post("/rent/check", checkRented);
router.get("/detail/:movieID", getDetail);
router.get("/trailer/:movieID", getTrailerID);
router.get("/recommendations/:movieID", getRecommendations);
router.get("/tvDetail/:showID", getShowDetail);
router.get("/tvRecommendations/:showID", getShowRecommendations)

export default router;