
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
        console.log("status: ",oAuth2_return.status, "error:",oAuth2_return.error );
    } else {
        const serializedCookieOptions = JSON.stringify(cookieOptions);
        const queryParams = querystring.stringify({
            token: token,
            user: oAuth2_return.user,
            cookieOptions: serializedCookieOptions,
        });
        const redirectUrl = `http://localhost:5173/auth/callback?${queryParams}`;
        res.redirect(redirectUrl);
    }
}

const FB_oAuth2 = async (req, res) => {
    let oAuth2_return = await oAuth2.Fb_Callback(req)
    if (oAuth2_return.status) {
        console.log("status: ",oAuth2_return.status, "error:",oAuth2_return.error );
    } else {
        const serializedCookieOptions = JSON.stringify(cookieOptions);
        const queryParams = querystring.stringify({
            token: token,
            user: oAuth2_return.user,
            cookieOptions: serializedCookieOptions,
        });
        const redirectUrl = `http://localhost:5173/auth/callback?${queryParams}`;
        res.redirect(redirectUrl);
    }
}

const GH_oAuth2 = async (req, res) => {
    let oAuth2_return = await oAuth2.Gh_Callback(req)
    if (oAuth2_return.status) {
        console.log("status: ",oAuth2_return.status, "error:",oAuth2_return.error );
    } else {
        const serializedCookieOptions = JSON.stringify(cookieOptions);
        const queryParams = querystring.stringify({
            token: token,
            user: oAuth2_return.user,
            cookieOptions: serializedCookieOptions,
        });
        const redirectUrl = `http://localhost:5173/auth/callback?${queryParams}`;
        res.redirect(redirectUrl);
    }
}
const TW_oAuth2 = async (req, res) => {
    let oAuth2_return = await oAuth2.Tw_Callback(req)
    if (oAuth2_return.status) {
        console.log("status: ",oAuth2_return.status, "error:",oAuth2_return.error );
    } else {
        const serializedCookieOptions = JSON.stringify(cookieOptions);
        const queryParams = querystring.stringify({
            token: token,
            user: oAuth2_return.user,
            cookieOptions: serializedCookieOptions,
        });
        const redirectUrl = `http://localhost:5173/auth/callback?${queryParams}`;
        res.redirect(redirectUrl);
    }
}

const output = {
    GG_oAuth2,
    FB_oAuth2,
    GH_oAuth2,
    TW_oAuth2
}
export default output