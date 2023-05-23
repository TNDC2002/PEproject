import UserFavouriteMovie from "../models/UserFavouriteMovie_Schema.js";
import UserRateMovie from "../models/UserRateMovie_Schema.js";
import UserRentMovie from "../models/UserRentMovie_Schema.js";
import axios from "axios";

/* FAVOURITE MOVIE */
export const favourite = async (req, res) => {
  // Get the payload
  const { userID, movieID, media_type } = req.body;
  // Check if the entry has already existed
  const favouriteMovie = await UserFavouriteMovie.findOne({
    userID: userID,
    movieID: movieID,
    media_type: media_type,
  });
  if (favouriteMovie) {
    try {
      await UserFavouriteMovie.deleteOne({ _id: favouriteMovie._id });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    try {
      const newFavourite = new UserFavouriteMovie({
        userID: userID,
        movieID: movieID,
        media_type: media_type,
      });
      const savedFavourite = await newFavourite.save();

      res.status(201).json(savedFavourite);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const checkFavourite = async (req, res) => {
  try {
    const { userID, movieID, media_type } = req.body;
    const favoriteMovie = await UserFavouriteMovie.findOne({
      userID: userID,
      movieID: movieID,
      media_type: media_type,
    });
    res.json({ favorited: favoriteMovie !== null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchSearchResult = async (req, res) => {
  try {
    const page = req.query.page;
    const searchedString = req.query.query;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${searchedString}&page=${page}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* RATING MOVIE */
export const rate = async (req, res) => {
  try {
  } catch (err) {}
};

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
};

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

/*
MOVIE'S DATA API
*/
export const getDetail = async (req, res) => {
  try {
    const { movieID } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTrailerID = async (req, res) => {
  try {
    const { movieID } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const { movieID } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${process.env.TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMovieCredits = async (req, res) => {
  try {
    const { movieID } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/*
TV SHOW'S DATA API
*/
export const getShowDetail = async (req, res) => {
  try {
    const { showID } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${showID}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getShowCredits = async (req, res) => {
  try {
    const { showID } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${showID}/credits?api_key=${process.env.TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getShowRecommendations = async (req, res) => {
  try {
    const { showID } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${showID}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getShowTrailerID = async (req, res) => {
  try {
    const { showID } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${showID}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/*
API FOR DISCOVERY
*/

export const getMovieDiscovery = async (req, res) => {
  try {
    const { page } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    );
    if (response.data !== null) {
      res.json(response.data.results);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getImageCarousel = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    );
    if (response.data !== null) {
      const updatedResult = response.data.results.map((movies) => ({
        movieID: movies.id,
        backdrop_path: movies.backdrop_path,
        poster_path: movies.poster_path,
      }));
      res.json(updatedResult);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getShowDiscovery = async (req, res) => {
  try {
    const { page } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
    );
    if (response.data !== null) {
      res.json(response.data.results);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAnimeDiscovery = async (req, res) => {
  try {
    const { page } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}&with_genres=16&with_keywords=210024|287501&with_text_query=death`
    );
    if (response.data !== null) {
      res.json(response.data.results);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getList = async (req, res) => {
  try {
    const { category } = req.query;
    const { page } = req.query;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
    );
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getShowList = async (req, res) => {
  try {
    const { category } = req.query;
    const { page } = req.query;
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${category}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
    );
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

var output = {
  favourite,
  checkFavourite,
  rent,
  checkRented,
  getDetail,
  getTrailerID,
  getRecommendations,
  getMovieCredits,
  getShowDetail,
  getShowCredits,
  getShowRecommendations,
  getShowTrailerID,
  getMovieDiscovery,
  getShowDiscovery,
  fetchSearchResult,
  getImageCarousel,
  getList,
  getShowList,
  getAnimeDiscovery,
};
export default output;
