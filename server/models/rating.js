import UserRateMovie from "../models/UserRateMovie"


/* INSERT USER SEARCH STRING */
const insertSearch = async (req, res) => {
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


var output = {
    insertSearch
};
export default output;