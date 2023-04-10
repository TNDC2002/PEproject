import express from "express";
import { login, checkEmail } from "../controller/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/check-email/:email", checkEmail);
export default router;