import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose"
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { configViewEngine } from "./config/ViewEngine.js";
import { initWebRoutes } from "./routes/WebRoutes.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';
/* CONFIGURATIONS SETUP */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname,'public/assets')));
app.use(cookieParser(process.env.Cookie_secret));
app.use(session({
  secret: process.env.Session_secret,
  resave: false,
  saveUninitialized: false
}));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null, "public/assets");
  },
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
});

/* ROUTES */
configViewEngine(app)
initWebRoutes(app)
/* SERVER SETUP AND MONGOOSE SETUP */
let PORT = process.env.PORT || 6969;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    let notification = "\x1b[1m\x1b[90mWelcome to the internet!!! \x1b[37mPORT: \x1b[36m\x1b[4m" + PORT + '\x1b[0m'
    let _6969 = "\x1b[1m\x1b[90mIf the U see \x1b[37mPORT: \x1b[36m\x1b[4m6969\x1b[0m\x1b[1m\x1b[90m! then you FUCKED UP \x1b[33mヽ(*・ω・)ﾉ\x1b[0m"

    console.log("\x1b[35m===============================================================================================\x1b[0m")
    console.log("\x1b[35m|\x1b[0m                                                                                             \x1b[35m|\x1b[0m")
    console.log("\x1b[35m|\x1b[0m                                                                                             \x1b[35m|\x1b[0m")
    console.log("\x1b[35m|\x1b[0m                          " + notification + "                              \x1b[35m|\x1b[0m")
    console.log("\x1b[35m|\x1b[0m                     " + _6969 + "                 \x1b[35m|\x1b[0m")
    console.log("\x1b[35m|\x1b[0m                                                                                             \x1b[35m|\x1b[0m")
    console.log("\x1b[35m===============================================================================================\x1b[0m")
  })
}).catch((error) => console.log(error))








