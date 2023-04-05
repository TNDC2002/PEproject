import express from "express";
import { favourite, checkFavourite, getList } from "../controller/movieAPI.js";

const router = express.Router();

router.post("/favourite", favourite);
router.post("/favourite/check", checkFavourite);
router.get("/list", getList);

export default router;