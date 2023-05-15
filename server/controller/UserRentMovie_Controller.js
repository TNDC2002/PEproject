/* only handle request and response... not doing LOGIC STUFF!!!
    Bring your logic stuff to models folder and call it here
*/
/* After setup your controller goto ../routes/WebRoutes.js to setup the URL */

import * as Rental from "../models/UserRentMovie_Model.js";

const Rental_GET = async (req, res) => {
    // GET the Rental
    let Rental_return = await Rental.default.GET(req);
    console.log(Rental_return);
    if (Rental_return.status) {
        return res.status(Rental_return.status).json({ error: Rental_return.error });
    }else{
        return res.status(200).json({ Rental_return });
    }
}

const Rental_POST = async (req, res) => {

    // post the Rental
    let Rental_return = await Rental.default.POST(req)
    if (Rental_return) {
        return res.status(Rental_return.status).json({ error: Rental_return.error });
    } else {
        return res.status(200).json({ Rental_return });
    }

}

const Rental_PUT = async (req, res) => {

    //UPDATE the rate
    let Rental_return = await Rental.default.PUT(req)
    if (Rental_return) {
        return res.status(Rental_return.status).json({ error: Rental_return.error });
    } else {
        return res.status(200).json({ Rental_return });
    }

}

const Rental_DELETE = async (req, res) => {

    //DELETE the rate
    let Delete_return = await Rental.default.DELETE(req)
    if (Delete_return) {
        return res.status(Delete_return.status).json({ error: Delete_return.error });
    } else {
        return res.status(200).json({ Delete_return });
    }

}

const handler = {
    GET_handler: Rental_GET,
    POST_handler: Rental_POST,
    PUT_handler: Rental_PUT,
    DELETE_handler: Rental_DELETE
}
export default handler;