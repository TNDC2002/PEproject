import mongoose from "mongoose";

const UserSearchHistorySchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },

    searchedString: {
        type: String,
        required: true
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

const UserSearchHistory = mongoose.model("UserSearchHistory", UserSearchHistorySchema);
export default UserSearchHistory;