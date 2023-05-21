import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 15,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 15,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        min: 5
    }
    ,
    picturePath: {
        type: String,
        default: ""
    },
    verified: {
        type: Boolean,
        default: true
    },
    balance: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    FbId:{
        type: String,
        required: false,
        unique: true
    },
    GgId:{
        type: String,
        required: false,
        unique: true
    },
    TwId:{
        type: String,
        required: false,
        unique: true
    },
    GhId:{
        type: String,
        required: false,
        unique: true
    }
}, 
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;