import UserSearchHistory from "../models/UserSearchHistory.js"


/* INSERT USER SEARCH STRING */
export const insertSearch = async (req, res) => {
    try {
        const {userID, searchedString, createdAt} = req.body

        // Check if a search entry with the same userID and searchedString already exists
        const existingSearchEntry = await UserSearchHistory.findOneAndUpdate(
            { userID, searchedString },
            { createdAt },
            { new: true }
        );

        if (existingSearchEntry) {
            res.status(200).json(existingSearchEntry);
        } else {
            const newSearchEntry = new UserSearchHistory({
                userID,
                searchedString,
                createdAt
            });

            const savedSearchEntry = await newSearchEntry.save();
            res.status(201).json(savedSearchEntry);
        }
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


/* FETCH USER SEARCH DATA */
export const fetchSearches = async (req, res) => {
    try {
        const userID = req.query.userID;
        const limit = parseInt(req.query.limit) || 10;
      
        const searchHistory = await UserSearchHistory.find({ userID })
          .limit(limit)
          .sort({ updatedAt: -1});
      
        res.json(searchHistory);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

var output = {
    insertSearch,
    fetchSearches
};
export default output;