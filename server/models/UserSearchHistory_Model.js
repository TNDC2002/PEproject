import UserSearchHistory from "./UserSearchHistory_Schema.js";


const GET_history = async (req) => {
    try {
        const userID  = req.query.userID;
        const limit = parseInt(req.query.limit) || 10;

        const History = await UserSearchHistory.find({ userID: userID })
            .limit(limit)
            .sort({ updatedAt: -1});

        return History;
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}

const POST_history = async (req) => {
    try {
        const { userID, searchedString, createdAt } = req.body;

        // Check if entry already exists
        const existingHistory = await UserSearchHistory.findOne({
            userID: userID,
            searchedString: searchedString
        });

        if (existingHistory) {
            // Entry exists, update the createdAt field
            existingHistory.createdAt = createdAt;
            await existingHistory.save();
        } else {
            // Entry doesn't exist, create a new entry
            const newHistory = new UserSearchHistory({
                userID: userID,
                searchedString: searchedString,
                createdAt: createdAt
            });
            await newHistory.save();
        }
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }
    }
}

const PUT_history = async (req) => {
    try {
        const { userID, searchedString, createdAt } = req.body;
        let History = await UserSearchHistory.findOneAndUpdate({
            userID: userID,
            searchedString: searchedString
        },{
            createdAt: createdAt
        })
        .then(()=>{})
        .catch((error) => {
            console.log("ERROR --- History.js --- can't UPDATE to DB")
        })

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const DELETE_history= async (req) => {
    try {
        const { userID, searchedString } = req.body;
        let History = {
            userID: userID,
            searchedString: searchedString
        }
        console.log("-----------------------------------------------")
        UserSearchHistory.findOneAndRemove(History)
            .then((deletedUser) => {
                if (deletedUser) {
                    console.log('NOTIFI --- History.js --- Rate has been deleted!');
                } else {
                    console.log('ERROR --- History.js --- Rate matching the conditions was not found.');
                }
            })
            .catch((error) => {
                console.log("ERROR --- History.js --- can't DELETE to DB")
            })
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
var output = {
    GET: GET_history,
    POST: POST_history,
    PUT: PUT_history,
    DELETE: DELETE_history
};
export default output;