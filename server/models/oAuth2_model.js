
import User from "./User_Schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const expiresIn = (60 * 60)*7; 
const Gg_Callback = async (req) => {
    try {
        const GgId = req.session.passport.user;
        const user = await User.findOne({ GgId: GgId });
        if (!user) {
            return {
                status: 400,
                error: "User does not exist."
            }
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn});
        const salt = await bcrypt.genSalt();
        const tokenHash = await bcrypt.hash(token, salt);
        //save token to DB
        let update = await User.findOneAndUpdate({ _id: user._id }, {
            token: tokenHash
        })
            .then((update) => { })
            .catch((error) => {
                return {
                    status: 400,
                    error: "fail to apply token"
                }
            })

        delete user.password;
        return {
            user: user,
            token: token
        }
    } catch (err) {
        console.log(err.message)
        return {
            status: 500,
            error: err.message
        }
    }
}

const Fb_Callback = async (req) => {
    try {
        const FbId = req.session.passport.user;
        const user = await User.findOne({ FbId: FbId });
        console.log("callback:", user)
        if (!user) {
            return {
                status: 400,
                error: "User does not exist."
            }
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn});
        const salt = await bcrypt.genSalt();
        const tokenHash = await bcrypt.hash(token, salt);
        //save token to DB
        let update = await User.findOneAndUpdate({ _id: user._id }, {
            token: tokenHash
        })
            .then((update) => { })
            .catch((error) => {
                return {
                    status: 400,
                    error: "fail to apply token"
                }
            })

        delete user.password;
        return {
            user: user,
            token: token
        }
    } catch (err) {
        console.log(err.message)
        return {
            status: 500,
            error: err.message
        }
    }
}
const Gh_Callback = async (req) => {
    try {
        const GhId = req.session.passport.user;
        const user = await User.findOne({ GhId: GhId });
        if (!user) {
            return {
                status: 400,
                error: "User does not exist."
            }
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn});
        const salt = await bcrypt.genSalt();
        const tokenHash = await bcrypt.hash(token, salt);
        //save token to DB
        let update = await User.findOneAndUpdate({ _id: user._id }, {
            token: tokenHash
        })
            .then((update) => { })
            .catch((error) => {
                return {
                    status: 400,
                    error: "fail to apply token"
                }
            })

        delete user.password;
        return {
            user: user,
            token: token
        }
    } catch (err) {
        console.log(err.message)
        return {
            status: 500,
            error: err.message
        }
    }
}
const Tw_Callback = async (req) => {
    try {
        const TwId = req.session.passport.user;
        const user = await User.findOne({ TwId: TwId });
        if (!user) {
            return {
                status: 400,
                error: "User does not exist."
            }
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn});
        const salt = await bcrypt.genSalt();
        const tokenHash = await bcrypt.hash(token, salt);
        //save token to DB
        let update = await User.findOneAndUpdate({ _id: user._id }, {
            token: tokenHash
        })
            .then((update) => { })
            .catch((error) => {
                return {
                    status: 400,
                    error: "fail to apply token"
                }
            })

        delete user.password;
        return {
            user: user,
            token: token
        }
    } catch (err) {
        console.log(err.message)
        return {
            status: 500,
            error: err.message
        }
    }
}
let output = {
    Gg_Callback,
    Fb_Callback,
    Gh_Callback,
    Tw_Callback
}
export default output