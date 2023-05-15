import UserSearchHistory from "../models/UserSearchHistory_Schema.js"
import UserFavouriteMovie from "../models/UserFavouriteMovie_Schema.js";
import UserMovieRental from "../models/UserRentMovie_Schema.js";
import axios from "axios";
import User from "../models/User_Schema.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await User.findOne({
            _id: userID,
        });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const updateUserProfile = async (req, res) => {
    const { userID } = req.params;
    const user = await User.findOne({
        _id: userID,
    });

    console.log(req.body);

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
        })
    }
    else {
        res.status(404).json({ message: err.message });
    }
}

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

/* FETCH USER FAVOURITE MOVIES AND SHOWS */
export const fetchFavourites = async (req, res) => {
    try {
        const userID = req.params.userID;
        const userFavoriteMovies = await UserFavouriteMovie.find({ userID });
        
        // Extract only the movieIDs from the user's favorite movies
        const movieDataList = userFavoriteMovies.map(movie => ({
        movieID: movie.movieID,
        media_type: movie.media_type
        }));
    
        // Fetch movie details from TMDB for each movieID and media_type
        const moviePromises = movieDataList.map(async movieData => {
        const { movieID, media_type } = movieData;
        const endpoint = media_type === 'tv' ? 'tv' : 'movie';
        const url = `https://api.themoviedb.org/3/${endpoint}/${movieID}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
        const response = await axios.get(url);
        return {
            ...response.data,
            media_type
        };
        });

        // Wait for all the requests to complete
        const movieResponses = await Promise.all(moviePromises);
        
        // Send the movie objects as the response
        res.json(movieResponses);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user favorite movies' });
    }
}
var output = {
    getUser,
    updateUserProfile,
    insertSearch,
    fetchSearches,
    fetchFavourites
};
export default output;