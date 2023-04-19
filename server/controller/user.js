import UserSearchHistory from "../models/UserSearchHistory.js"


/* INSERT USER SEARCH STRING */
export const insertSearch = async (req, res) => {
    try {
        const {userID, searchedString, createdAt} = req.body

        const newSearchEntry = new UserSearchHistory({
            userID,
            searchedString,
            createdAt
        });
    
        const savedSearchEntry = await newSearchEntry.save();
        res.status(201).json(savedSearchEntry);
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}