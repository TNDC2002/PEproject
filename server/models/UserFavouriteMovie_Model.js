import UserFavouriteMovie from "./UserFavouriteMovie_Schema";


const GET_favourite = async (req) => {
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

const POST_favourite = async (req) => {
    try {
        

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const PUT_favourite= async (req) => {
    try {
        

    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
const DELETE_favourite= async (req) => {
    try {
        
    } catch (err) {
        return {
            status: 500,
            error: err.message
        }

    }
}
var output = {
    GET: GET_favourite,
    POST: POST_favourite,
    PUT: PUT_favourite,
    DELETE: DELETE_favourite
};
export default output;