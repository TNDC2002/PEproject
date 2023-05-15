import User from "./User_Schema";

const GET_user = async (req) => {
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

const POST_user = async (req) => {
    try {
        

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const PUT_user = async (req) => {
    try {
        

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const DELETE_user = async (req) => {
    try {
        
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
var output = {
    GET: GET_user,
    POST: POST_user,
    PUT: PUT_user,
    DELETE: DELETE_user
};
export default output;