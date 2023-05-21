
import * as oAuth2 from '../models/oAuth2_Model.js'
import * as dotenv from 'dotenv';
dotenv.config()
const cookieOptions = {
    maxAge: 36000000, // Cookie expiration time (in milliseconds)
    httpOnly: true, // Restrict cookie access to HTTP requests only
    signed: true, // Enable cookie signing
    sameSite: 'Lax'
};

const GG_oAuth2 = async (req, res) => {
    try {
        let oAuth2_return = await oAuth2.default.Gg_Callback(req)
        if (oAuth2_return.status) {
            return res.status(oAuth2_return.status).json({ error: oAuth2_return.error });
        } else {
            req.session.destroy((err) => {
                if (err) {
                    console.log('error ----- /login/google fail to destroy session:', err);
                }
                res.cookie('token', oAuth2_return.token, cookieOptions);
                res.status(200).json({ user: oAuth2_return.user });
            });
        }
    } catch (err) {
        console.log("/login/google --- error:", err.message)
    }

}

const FB_oAuth2 = async (req, res) => {
    try {
        let oAuth2_return = await oAuth2.default.Fb_Callback(req)
        if (oAuth2_return.status) {
            return res.status(oAuth2_return.status).json({ error: oAuth2_return.error });
        } else {
            req.session.destroy((err) => {
                if (err) {
                    console.log('error ----- /login/facebook fail to destroy session:', err);
                }
                res.cookie('token', oAuth2_return.token, cookieOptions);
                res.status(200).json({ user: oAuth2_return.user });
            });
        }
    } catch (err) {
        console.log("/login/facebook --- error:", err.message)
    }
}

const GH_oAuth2 = async (req, res) => {
    try {
        let oAuth2_return = await oAuth2.default.Gh_Callback(req)
        if (oAuth2_return.status) {
            return res.status(oAuth2_return.status).json({ error: oAuth2_return.error });
        } else {
            req.session.destroy((err) => {
                if (err) {
                    console.log('error ----- /login/github fail to destroy session:', err);
                }
                res.cookie('token', oAuth2_return.token, cookieOptions);
                res.status(200).json({ user: oAuth2_return.user });
            });
        }
    } catch (err) {
        console.log("/login/github --- error:", err.message)
    }

}
const TW_oAuth2 = async (req, res) => {
    try {
        let oAuth2_return = await oAuth2.default.Tw_Callback(req)
        if (oAuth2_return.status) {
            return res.status(oAuth2_return.status).json({ error: oAuth2_return.error });
        } else {

            req.session.destroy((err) => {
                if (err) {
                    console.log('error ----- /login/twitter fail to destroy session:', err);
                }
                res.cookie('token', oAuth2_return.token, cookieOptions);
                res.status(200).json({ user: oAuth2_return.user });
            });
        }
    } catch (err) {
        console.log("/login/twitter --- error:", err.message)
    }
}

const output = {
    GG_oAuth2,
    FB_oAuth2,
    GH_oAuth2,
    TW_oAuth2
}
export default output