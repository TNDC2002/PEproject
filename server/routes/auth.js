import express from "express";
import { login } from "../controller/auth.js";
import { verify } from "../controller/auth.js";
import { verified } from "../controller/auth.js";
const router = express.Router();

router.post("/login", login);
//verify email
router.get("/verify/:userId/:uniqueString", verify);
//redirect when verified
router.get("/verified", verified);

export default router;