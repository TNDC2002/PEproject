import express from "express";
import { getUser, updateUserProfile } from "../controller/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userID", verifyToken, getUser);
router.post("/userID", verifyToken, updateUserProfile);

export default router; 