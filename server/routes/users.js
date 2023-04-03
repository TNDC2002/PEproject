import express from "express";
import { getUser } from "../controller/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userID", verifyToken, getUser);

export default router;