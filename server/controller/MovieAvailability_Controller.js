/* only handle request and response... not doing LOGIC STUFF!!!
    Bring your logic stuff to models folder and call it here
*/
/* After setup your controller goto ../routes/WebRoutes.js to setup the URL */

import * as Available from "../models/MovieAvailability_Model.js";

const Available_GET = async (req, res) => {
    let Available_return = await Available.default.GET(req);

    if (Available_return.status) {
        return res.status(Available_return.status).json({ error: Available_return.error });
    } else {
        return res.status(200).json({ Available_return });
    }
}

const Available_POST = async (req, res) => {
    let Available_return = await Available.default.POST(req);
    if (Available_return) {
        return res.status(Available_return.status).json({ error: Available_return.error });
    } else {
        return res.status(200).json({ Available_return });
    }
}
const Available_PUT = async (req, res) => {
    let Available_return = await Available.default.PUT(req);
    if (Available_return) {
        return res.status(Available_return.status).json({ error: Available_return.error });
    } else {
        return res.status(200).json({ Available_return });
    }
}
const Available_DELETE = async (req, res) => {
    let Delete_return = await Available.default.DELETE(req)
    if (Delete_return) {
        return res.status(Delete_return.status).json({ error: Delete_return.error });
    } else {
        return res.status(200).json({ Delete_return });
    }
}

const handler = {
    GET_handler: Available_GET,
    POST_handler: Available_POST,
    PUT_handler: Available_PUT,
    DELETE_handler: Available_DELETE
}
export default handler;