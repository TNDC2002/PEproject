/* only handle request and response... not doing LOGIC STUFF!!!
    Bring your logic stuff to models folder and call it here
*/
/* After setup your controller goto ../routes/WebRoutes.js to setup the URL */

import * as Favourite from "../models/UserFavouriteMovie_Model.js";

const Favourite_GET = async (req, res) => {
    let Favourite_return = await Favourite.default.GET(req);

    if (Favourite_return.status) {
        return res.status(Favourite_return.status).json({ error: Favourite_return.error });
    } else {
        return res.status(200).json({ Favourite_return });
    }
}

const Favourite_POST = async (req, res) => {
    let Favourite_return = await Favourite.default.POST(req);
    if (Favourite_return) {
        return res.status(Favourite_return.status).json({ error: Favourite_return.error });
    } else {
        return res.status(200).json({ Favourite_return });
    }
}
const Favourite_PUT = async (req, res) => {
    let Favourite_return = await Favourite.default.PUT(req);
    if (Favourite_return) {
        return res.status(Favourite_return.status).json({ error: Favourite_return.error });
    } else {
        return res.status(200).json({ Favourite_return });
    }
}
const Favourite_DELETE = async (req, res) => {
    let Delete_return = await Favourite.default.DELETE(req)
    if (Delete_return) {
        return res.status(Delete_return.status).json({ error: Delete_return.error });
    } else {
        return res.status(200).json({ Delete_return });
    }
}

const handler = {
    GET_handler: Favourite_GET,
    POST_handler: Favourite_POST,
    PUT_handler: Favourite_PUT,
    DELETE_handler: Favourite_DELETE
}
export default handler;