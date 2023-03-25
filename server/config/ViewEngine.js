import express from "express";

let configViewEngine = (app) => {
  app.use(express.static('./views/public'))
  app.set("view engine", "ejs");
  app.set("views", "../views");
}

export { configViewEngine };

