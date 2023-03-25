// import {sample} from "../models/sample.js";
import * as api_insert from "../models/api_insert.js";
const Sample_page = (req, res) => {
  return res.render('./Sample/test');
}
const Api_insert = (req,res) => {
  return api_insert(req,res);
}
const controller = {
  Sample : Sample_page,
  Api_insert : Api_insert
}
export default controller