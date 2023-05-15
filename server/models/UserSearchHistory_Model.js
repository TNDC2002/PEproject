import UserSearchHistory from "./UserSearchHistory_Schema";


const GET_history = async (req) => {
    try {
        const { userID } = req.body;
        const History = await UserSearchHistory.findOne({ userID: userID });
        if (History.userID){
            return History;
        }else{
            return {
                status: 500,
                error: "not found"
            }
        }
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
        const newHistory = new UserSearchHistory({
            userID: userID,
            searchedString: searchedString,
            createdAt: createdAt
        });
        newHistory.save()
            .then(async () => {
            })
            .catch((error) => {
                console.log("ERROR --- History.js --- can't SAVE to DB")
            })

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
        let History
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