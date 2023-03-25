// import {sample} from "../models/sample.js";
import * as api_insert from "../models/api_insert.js";
import * as movies from "../models/movies.js"
const Sample_page = (req, res) => {
  return res.render('./Sample/test');
}
const Api_insert = (req,res) => {
  return api_insert(req,res);
}
const Movies = (req,res) => {
  return movies(req,res);
}
const controller = {
  Sample : Sample_page,
  Api_insert : Api_insert,
  Movies : Movies
}

export default controller