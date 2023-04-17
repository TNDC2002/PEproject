import express from "express";
import { favourite, checkFavourite, getList } from "../controller/movieAPI.js";
import { favourite, checkFavourite, getDetail, getTrailerID } from "../controller/movieAPI.js";

const router = express.Router();

router.post("/favourite", favourite);
router.post("/favourite/check", checkFavourite);
router.get("/list", getList);

router.get("/detail/:movieID", getDetail);
router.get("/trailer/:movieID", getTrailerID);
export default router;