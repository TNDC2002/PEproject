import mongoose from "mongoose";

const EmailVerificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },

    verificationString: {
        type: String
    },

    createdAt: {
        type: Date
    },

    expiresAt: {
        type: Date
    }
}, 
    { timestamps: true }
);

const EmailVerification = mongoose.model("EmailVerification", EmailVerificationSchema);
export default EmailVerification;