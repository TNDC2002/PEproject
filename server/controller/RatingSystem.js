/* only handle request and response... not doing LOGIC STUFF!!!
    Bring your logic stuff to models folder and call it here
*/
/* After setup your controller goto ../routes/WebRoutes.js to setup the URL */

import * as Rating from "../models/Rating.js";

const Sample_handler_GET = async (req, res) => {
    // GET the rating
    let Rating_return = await Rating.default.GET(req)
    if (Rating_return.status) {
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }else{
        res.status(200).json({ Rating_return });
    }
}

const Sample_handler_POST = (req, res) => {

    // post the rating
    let Rating_return = Rating.default.POST(req)
    if (Rating_return) {
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }

}

const Sample_handler_PUT = (req, res) => {

    //UPDATE the rate
    let Rating_return = Rating.default.PUT(req)
    if (Rating_return) {
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }

}

const Sample_handler_DELETE = (req, res) => {

    //DELETE the rate
    let Delete_return = Rating.default.DELETE(req)
    if (Rating_return) {
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }

}

const handler = {
    GET_handler: Sample_handler_GET,
    POST_handler: Sample_handler_POST,
    PUT_handler: Sample_handler_PUT,
    DELETE_handler: Sample_handler_DELETE
}
export default handler