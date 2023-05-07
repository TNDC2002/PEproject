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
            res.status(500).json({ error: err.message });
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
          res.status(500).json({ error: err.message });
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
      const { userID, movieID, rentalBeginDate, rentalExpireDate } = req.body;
      // Create a new UserMovieRental document
      const rental = new UserRentMovie({
        userID: userID,
        movieID: movieID,
        rentalBeginDate: rentalBeginDate,
        rentalExpireDate: rentalExpireDate,
      });
  
      // Save the rental document to the database
      const savedRental = await rental.save();
      res.status(201).json(savedRental);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

export const checkRented = async (req, res) => {
  try {
    const { userID, movieID } = req.body;
    const rentedMovie = await UserRentMovie.findOne({
      userID: userID,
      movieID: movieID,
    });
    res.json({ rented: rentedMovie !== null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* RETRIEVING MOVIE'S DETAIL */
export const getDetail = async (req, res) => {
  try {
    const {movieID} = req.params;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/* RETRIEVING MOVIE'S TRAILER */
export const getTrailerID = async (req, res) => {
  try {
    const {movieID} = req.params;
    const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    const movieTitle = movieResponse.data.title;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(movieTitle)}+trailer&type=video&videoDefinition=high&key=${process.env.YOUTUBE_API_KEY1}`
    );
    if (response.data.items.length > 0) {
      const data = {
        trailerID: response.data.items[0].id.videoId
      }

      res.json(data);
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/* RETRIEVING TMDB'S RECOMMMENDATIONS */
export const getRecommendations = async (req, res) => {
  try {
    const {movieID} = req.params;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${process.env.TMDB_API_KEY}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/* RETRIEVING SHOW'S DETAIL */
export const getShowDetail = async (req, res) => {
  try {
    const {showID} = req.params;
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${showID}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    console.log("getShowDetail called with showID:", showID);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/* RETRIEVING SHOW'S RECOMMMENDATIONS */
export const getShowRecommendations = async (req, res) => {
  try {
    const {showID} = req.params;
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${showID}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

var output = {
  favourite,
  checkFavourite,
  rent,
  checkRented,
  getDetail,
  getTrailerID,
  getRecommendations,
  getShowDetail,
  getShowRecommendations
}
export default output;
