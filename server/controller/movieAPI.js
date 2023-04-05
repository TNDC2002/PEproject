import UserFavouriteMovie from "../models/UserFavouriteMovie.js"
import UserRateMovie from "../models/UserRateMovie.js"
import UserRentMovie from "../models/UserRentMovie.js"
import axios from "axios"

/* FAVOURITE MOVIE */
export const favourite = async (req, res) => {
      // Get the payload  
      const { userID, movieID } = req.body;
      // Check if the entry has already existed
      const favouriteMovie = await UserFavouriteMovie.findOne({
        userID: userID,
        movieID: movieID,
      });
      if (favouriteMovie) {
        try {
            await UserFavouriteMovie.deleteOne({ _id: favouriteMovie._id });
            res.status(204).send();

          } catch (err) {
            res.status(500).json({ error: 'An error occurred while deleting the movie from favourites.' });
          }
      }

    else {
        try {
            const newFavourite = new UserFavouriteMovie({
                userID: userID,
                movieID: movieID,
        });
        const savedFavourite = await newFavourite.save();
  
        res.status(201).json(savedFavourite);
        } catch (err) {
      res.status(500).json({ error: 'An error occured while adding the movie from favourite.' });
        }
    };
}
  
export const checkFavourite = async (req, res) => {
    try {
      const { userID, movieID } = req.body;
      const favoriteMovie = await UserFavouriteMovie.findOne({
        userID: userID,
        movieID: movieID,
      });
      res.json({ favorited: favoriteMovie !== null });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
/* RATING MOVIE */
export const rate = async (req, res) => {
    try {

    } catch (err) {
        
    }
}

/* RENTING MOVIE */
export const rent = async (req, res) => {
    try {

    } catch (err) {
        
    }
}

/* GETTING LIST OF MOVIES */
export const getList = async (req, res) => {
  try {
      const { category } = req.query;
      console.log(category);
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
      res.json(response.data);

  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
  }
}