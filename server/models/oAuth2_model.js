
import User from "../models/User.js";

const Gg_Callback = async (req) => {
    try {
        const { GgId } = req.body;
        const user = await User.findOne({ GgId: GgId });
        if (!user) {
            return {
                status: 400,
                error: "User does not exist."
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                status: 400,
                error: "Invalid credentials."
            }
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const salt = await bcrypt.genSalt();
        const tokenHash = await bcrypt.hash(token, salt);
        //save token to DB
        let update = await User.findOneAndUpdate({ _id: user._id }, {
            token: tokenHash
        })
            .then((update) => { })
            .catch((error) => {
                console.log("ERROR --- Auth.js --- can't UPDATE token to DB")
            })

        delete user.password;
        return {
         user: user,
         token: token
        }
    } catch (err) {
        console.log(err.message)
        return{
            status: 500,
            error: err.message
        }
    }
}

const Fb_Callback = async (req) => {
    try {
        const { FbId } = req.body;
        const user = await User.findOne({ FbId: FbId });
        if (!user) {
            return {
                status: 400,
                error: "User does not exist."
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                status: 400,
                error: "Invalid credentials."
            }
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const salt = await bcrypt.genSalt();
        const tokenHash = await bcrypt.hash(token, salt);
        //save token to DB
        let update = await User.findOneAndUpdate({ _id: user._id }, {
            token: tokenHash
        })
            .then((update) => { })
            .catch((error) => {
                console.log("ERROR --- Auth.js --- can't UPDATE token to DB")
            })

        delete user.password;
        return {
         user: user,
         token: token
        }
    } catch (err) {
        console.log(err.message)
        return{
            status: 500,
            error: err.message
        }
    }
}
let output = {
    Gg_Callback,
    Fb_Callback
}
export default output