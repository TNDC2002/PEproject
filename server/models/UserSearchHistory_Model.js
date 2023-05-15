import UserSearchHistory from "./UserSearchHistory_Schema";


const GET_history = async (req) => {
    try {
        
        if (RATE.userID){
            return RATE;
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
        

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const PUT_history = async (req) => {
    try {
        

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const DELETE_history= async (req) => {
    try {
        
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