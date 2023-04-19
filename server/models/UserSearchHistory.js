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
    }
}, 
    { timestamps: true }
);

const UserSearchHistory = mongoose.model("User-Search", UserSearchHistorySchema);
export default UserSearchHistory;