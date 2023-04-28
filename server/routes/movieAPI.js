import express from "express";
import { favourite, checkFavourite, getDetail, getTrailerID, getRecommendations } from "../controller/movieAPI.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/favourite", verifyToken, favourite);
router.post("/favourite/check", checkFavourite);
router.get("/detail/:movieID", getDetail);
router.get("/trailer/:movieID", getTrailerID);
router.get("/recommendations/:movieID", getRecommendations);
export default router;