
import oAuth2 from '../models/oAuth2_model.js'
import * as dotenv from 'dotenv';
dotenv.config()
const cookieOptions = {
    maxAge: 36000000, // Cookie expiration time (in milliseconds)
    httpOnly: true, // Restrict cookie access to HTTP requests only
    signed: true, // Enable cookie signing
    sameSite: 'Lax'
};

const GG_oAuth2 = async (req, res) => {
    let oAuth2_return = await oAuth2.Gg_Callback(req)
    if (oAuth2_return.status) {
        return res.status(oAuth2_return.status).json({ error: oAuth2_return.error });
    }else{
        res.cookie('token', token, cookieOptions);
        res.status(200).json({ user: oAuth2_return.user });
    }
}

const FB_oAuth2 = async (req, res) => {
    let oAuth2_return = await oAuth2.Fb_Callback(req)
    if (oAuth2_return.status) {
        return res.status(oAuth2_return.status).json({ error: oAuth2_return.error });
    }else{
        res.cookie('token', token, cookieOptions);
        res.status(200).json({ user: oAuth2_return.user });
    }
}

const output = {
    GG_oAuth2,
    FB_oAuth2
}
export default output