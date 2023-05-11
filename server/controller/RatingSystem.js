/* only handle request and response... not doing LOGIC STUFF!!!
    Bring your logic stuff to models folder and call it here
*/
/* After setup your controller goto ../routes/WebRoutes.js to setup the URL */

import * as sample from "../models/sample.js";

const Sample_handler_GET = (req, res) => {
 
    sample.default.main(req)
    return res.render('./Sample/test');
}
const Sample_handler_POST = (req, res) => {

}
const Sample_handler_PUT = (req, res) => {

}
const Sample_handler_DELETE = (req, res) => {

}

const Sample_handler = {
    Sample_handler_GET: Sample_handler_GET,
    Sample_handler_POST: Sample_handler_POST,
    Sample_handler_PUT: Sample_handler_PUT,
    Sample_handler_DELETE: Sample_handler_DELETE
}
export default Sample_handler