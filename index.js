import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from "./config/ViewEngine.js";
import { initWebRoutes } from "./routes/WebRoutes.js";
import dotenv from "dotenv";
import mysql from "mysql"

dotenv.config();

const app = express();

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vinhdeptrai3006",
  database: "test"
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

app.get("/", (req, res) => {
  res.json("Hello from the backend!")
})

app.get("/movies", (req, res) => {
  const q = "SELECT * FROM movies;"
  db.query(q, (err, data) => {
    if (err) {
      console.error('Error fetching data from MySQL database:', err);
      res.json(err);
    } else {
      res.json(data);
    }
  })
})

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
