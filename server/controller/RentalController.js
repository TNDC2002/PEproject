/* only handle request and response... not doing LOGIC STUFF!!!
    Bring your logic stuff to models folder and call it here
*/
/* After setup your controller goto ../routes/WebRoutes.js to setup the URL */

import * as Rental from "../models/Rental.js";

const Rental_GET = async (req, res) => {
    // GET the Rental
    let Rental_return = await Rental.default.GET(req)
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
    }else{
        return res.status(200).json({ Rental_return });
    }

}

const Rental_PUT = async (req, res) => {

    //UPDATE the rate
    let Rental_return = await Rental.default.PUT(req)
    if (Rental_return) {
        return res.status(Rental_return.status).json({ error: Rental_return.error });
    }else{
        return res.status(200).json({ Rental_return });
    }

}

const Rental_DELETE = async (req, res) => {

    //DELETE the rate
    let Delete_return = await Rental.default.DELETE(req)
    if (Delete_return) {
        return res.status(Rental_return.status).json({ error: Rental_return.error });
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