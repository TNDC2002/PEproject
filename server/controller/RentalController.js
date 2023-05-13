/* only handle request and response... not doing LOGIC STUFF!!!
    Bring your logic stuff to models folder and call it here
*/
/* After setup your controller goto ../routes/WebRoutes.js to setup the URL */

import * as Rental from "../models/Rental.js";

const Rental_GET = async (req, res) => {
    // GET the rating
    let Rating_return = await Rating.default.GET(req)
    if (Rating_return.status) {
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }else{
        return res.status(200).json({ Rating_return });
    }
}

const Rental_POST = async (req, res) => {

    // post the rating
    let Rating_return = await Rating.default.POST(req)
    if (Rating_return) {
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }else{
        return res.status(200).json({ Rating_return });
    }

}

const Rental_PUT = async (req, res) => {

    //UPDATE the rate
    let Rating_return = await Rating.default.PUT(req)
    if (Rating_return) {
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }else{
        return res.status(200).json({ Rating_return });
    }

}

const Rental_DELETE = async (req, res) => {

    //DELETE the rate
    let Delete_return = await Rating.default.DELETE(req)
    if (Delete_return) {
        return res.status(Rating_return.status).json({ error: Rating_return.error });
    }else{
        return res.status(200).json({ Delete_return });
    }

}

const handler = {
    GET_Rental: Rental_GET,
    POST_Rental: Rental_POST,
    PUT_Rental: Rental_PUT,
    DELETE_Rental: Rental_DELETE
}
export default handler