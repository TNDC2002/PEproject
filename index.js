import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql"

const app = express();


import { configViewEngine } from "./config/ViewEngine.js";
import { initWebRoutes } from "./routes/WebRoutes.js";
import dotenv from "dotenv";


dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_database_password",
  database: "your_database_name"
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

//config part
configViewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;
// !Port => 6969


app.listen(port,() =>{
    let notification = "\x1b[1m\x1b[90mWelcome to the internet!!! \x1b[37mPORT: \x1b[36m\x1b[4m" + port + '\x1b[0m'
    let _6969 =        "\x1b[1m\x1b[90mIf the U see \x1b[37mPORT: \x1b[36m\x1b[4m6969\x1b[0m\x1b[1m\x1b[90m! then you FUCKED UP \x1b[33mヽ(*・ω・)ﾉ\x1b[0m"

    console.log(      "\x1b[35m===============================================================================================\x1b[0m")
    console.log("\x1b[35m|\x1b[0m                                                                                             \x1b[35m|\x1b[0m")
    console.log("\x1b[35m|\x1b[0m                                                                                             \x1b[35m|\x1b[0m")
    console.log("\x1b[35m|\x1b[0m                          " + notification                   +"                              \x1b[35m|\x1b[0m")
    console.log("\x1b[35m|\x1b[0m                     " +         _6969                                   +"                 \x1b[35m|\x1b[0m")
    console.log("\x1b[35m|\x1b[0m                                                                                             \x1b[35m|\x1b[0m")
    console.log(     "\x1b[35m===============================================================================================\x1b[0m")
})

