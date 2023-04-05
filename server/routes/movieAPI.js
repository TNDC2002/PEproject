import express from "express";
import { favourite, checkFavourite, getDetail } from "../controller/movieAPI.js";

const router = express.Router();

router.post("/favourite", favourite);
router.post("/favourite/check", checkFavourite);
router.get("/detail/:movieID", getDetail);
export default router;