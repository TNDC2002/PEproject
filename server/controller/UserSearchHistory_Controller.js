/* only handle request and response... not doing LOGIC STUFF!!!
    Bring your logic stuff to models folder and call it here
*/
/* After setup your controller goto ../routes/WebRoutes.js to setup the URL */

import * as History from "../models/UserSearchHistory_Model.js";

const History_GET = async (req, res) => {
    // GET the Rental
    let History_return = await History.default.GET(req);
    if (History_return.status) {
        return res.status(History_return.status).json({ error: History_return.error });
    }else{
        return res.status(200).json({ History_return });
    }
}

const History_POST = async (req, res) => {

    // post the Rental
    let History_return = await History.default.POST(req)
    if (History_return) {
        return res.status(History_return.status).json({ error: History_return.error });
    } else {
        return res.status(200).json({ History_return });
    }

}

const History_PUT = async (req, res) => {

    //UPDATE the rate
    let History_return = await History.default.PUT(req)
    if (History_return) {
        return res.status(History_return.status).json({ error: History_return.error });
    } else {
        return res.status(200).json({ History_return });
    }

}

const History_DELETE = async (req, res) => {

    //DELETE the rate
    let Delete_return = await History.default.DELETE(req)
    if (Delete_return) {
        return res.status(Delete_return.status).json({ error: Delete_return.error });
    } else {
        return res.status(200).json({ Delete_return });
    }

}

const handler = {
    GET_handler: History_GET,
    POST_handler: History_POST,
    PUT_handler: History_PUT,
    DELETE_handler: History_DELETE
}
export default handler;