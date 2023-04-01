import express from "express";
import { favourite, checkFavourite } from "../controller/movieAPI.js";

const router = express.Router();

router.post("/favourite", favourite);
router.post("/favourite/check", checkFavourite);
export default router;