import express from "express";
import bodyParser from "body-parser";
import ViewEngine from "./config/ViewEngine";
import WebRoutes from "./routes/WebRoutes";
import dotenv from "dotenv";
dotenv.config();

let app = express();

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//config part
ViewEngine(app)
WebRoutes(app)


let port = process.env.Port ||6969;
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
