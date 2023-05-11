/* only handle request and response... not doing LOGIC STUFF!!!
    Bring your logic stuff to models folder and call it here
*/
/* After setup your controller goto ../routes/WebRoutes.js to setup the URL */

import * as Rating from "../models/Rating.js";

const Sample_handler_GET = (req, res) => {
 
    
    return res.render('./Sample/test');
}

const Sample_handler_POST = (req, res) => {

    // post the rating
    Rating_return = Rating.default.POST(req)
    if (Rating_return){
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }
    
}

const Sample_handler_PUT = (req, res) => {

    //UPDATE the rate
    Put_return = Rating.default.PUT(req)
    if (Rating_return){
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }

}

const Sample_handler_DELETE = (req, res) => {

    //DELETE the rate
    Delete_return = Rating.default.DELETE(req)
    if (Rating_return){
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }

}

const Sample_handler = {
    GET_handler: Sample_handler_GET,
    POST_handler: Sample_handler_POST,
    PUT_handler: Sample_handler_PUT,
    DELETE_handler: Sample_handler_DELETE
}
export default Sample_handler