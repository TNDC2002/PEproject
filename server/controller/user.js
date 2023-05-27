import UserSearchHistory from "../models/UserSearchHistory_Schema.js"
import UserFavouriteMovie from "../models/UserFavouriteMovie_Schema.js";
import UserMovieRental from "../models/UserRentMovie_Schema.js";
import axios from "axios";
import User from "../models/User_Schema.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

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

export const getUserImage = async (req, res) => {
    const { userID } = req.params;
    const user = await User.findOne({
        _id: userID,
    });

    if (user) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(path.dirname(__filename));
        const imagePath = path.join(__dirname, 'public/assets', user.picturePath);
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                console.log('Image not found');
                res.status(404).send('Image not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        });
    }
}

export const updateBalance = async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await User.findOne({
            _id: userID,
        });

        if (user) {
            user.balance = (user.balance + req.body.balance) || user.balance;
            const updatedUser = await user.save();
            res.json({ balance: updatedUser.balance })
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await User.findOne({
            _id: userID,
        });

        if (user) {
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.email = req.body.email || user.email;
            // const salt = await bcrypt.genSalt();
            // const passwordHash = await bcrypt.hash(req.body.password, salt);
            // user.password = passwordHash || user.password;
            const updatedUser = await user.save();

            res.json({
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                // password: updatedUser.password,
            })
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message });
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
            media_type: movie.media_type,
            season: movie.season
        }));

        // Fetch movie details from TMDB for each movieID and media_type
        const moviePromises = movieDataList.map(async movieData => {
            const { movieID, media_type, season } = movieData;
            const endpoint = media_type === 'tv' ? 'tv' : 'movie';
            const url = `https://api.themoviedb.org/3/${endpoint}/${movieID}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
            const response = await axios.get(url);
            return {
                ...response.data,
                media_type,
                intendedSeason: season
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
export const fetchRentals = async (req, res) => {
    try {
        const userID = req.params.userID;
        const userRentedMovies = await UserMovieRental.find({ userID });

        // Extract only the movieIDs from the user's favorite movies
        const movieDataList = userRentedMovies.map(movie => ({
            movieID: movie.movieID,
            media_type: movie.media_type,
            season: movie.season,
            rentalBeginDate: movie.rentalBeginDate,
            rentalExpireDate: movie.rentalExpireDate
        }));

        // Fetch movie details from TMDB for each movieID and media_type
        const moviePromises = movieDataList.map(async movieData => {
            const { movieID, media_type, season, rentalBeginDate, rentalExpireDate } = movieData;
            const endpoint = media_type === 'tv' ? 'tv' : 'movie';
            const url = `https://api.themoviedb.org/3/${endpoint}/${movieID}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
            const response = await axios.get(url);
            return {
                ...response.data,
                media_type,
                intendedSeason: season,
                rentalBeginDate,
                rentalExpireDate
            };
        });

        // Wait for all the requests to complete
        const movieResponses = await Promise.all(moviePromises);

        // Send the movie objects as the response
        res.json(movieResponses);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user rented movies' });
    }
}
var output = {
    getUser,
    updateUserProfile,
    fetchFavourites,
    fetchRentals,
    updateBalance,
};
export default output;