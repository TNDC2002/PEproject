import express from "express";
import { login } from "../controller/auth.js";

const router = express.Router();

router.post("/login", login);
//verify email
router.get("/verify/:userId/:uniqueString",(req,res)=>{
    let {userId, uniqueString} = req.params;
})

export default router;