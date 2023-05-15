import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme, Typography, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Image from 'mui-image';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [defaultSearchOptions, setDefaultSearchOptions] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [options, setOptions] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);

  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const fetchSearchResult = async (value) => {
    try {
      const fetchSearchResultResponse = await fetch(
        `http://localhost:5000/search/?query=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      const data = await fetchSearchResultResponse.json();
      const results = data.results.filter((movie) => movie.media_type === 'tv' || movie.media_type === 'movie').map((movie) => ({
      label: movie.original_name ? movie.original_name : movie.original_title,
      id: movie.id,
      poster_path: movie.backdrop_path,
      media_type: movie.media_type
      }));
      setSearchedMovies(results);
    } catch (err) {
      console.error(err)
    }
  }

  const fetchUserSearch = async (userID, numberOfEntry) => {
    try {
      const fetchUserSearchResponse = await fetch(
        `http://localhost:5000/api/history/get?userID=${userID}&limit=${numberOfEntry}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        } 
      );
      if (!fetchUserSearchResponse.ok) {
        throw new Error('Failed to fetch user search data');
      }
      const userSearchData = await fetchUserSearchResponse.json();
      const searchedStrings = userSearchData.History_return.map((search) => search.searchedString);

      setDefaultSearchOptions(await searchedStrings.map((search) => {
        return {
          label: search,
          history: true
        };
      }));
      console.log("Just fetched new searches");
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    fetchUserSearch(user._id, 5);
  }, []);

  useEffect(() => {
    setOptions(defaultSearchOptions);
  }, [defaultSearchOptions]);

  useEffect(() => {
    if (options.at(0) === '') {
      options.push();
    }
  }, [options])

  const insertUserSearch = async (userID, searchedString) => {
    const requestData = {
      userID: userID,
      searchedString: searchedString,
      createdAt: new Date()
    };

    const insertUserSearchResponse = await fetch(
      "http://localhost:5000/api/history/insert",
      {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData),
      }
    );
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setSelectedOption(false);

  };

  const handleSearch = async (value) => {
    if (!selectedOption && value !== "") {
      await insertUserSearch(user._id, value);
      fetchUserSearch(user._id, 5);
      navigate(`/home/search/?query=${value}`);
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (selectedOption) {
        setSelectedOption(false);
      }
      handleSearch(inputValue);
    }
  };
  
  const handleInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue);
    fetchSearchResult(newInputValue);
    const alreadyExists = options.some((option) => option.label === newInputValue);
    if (!alreadyExists) {
      setOptions([{ label: newInputValue }, ...defaultSearchOptions, ...searchedMovies]);
      if (newInputValue == "") {
        setOptions(defaultSearchOptions);
      }
    }
  };

  return (
    <Autocomplete
    freeSolo
      options={options}
      inputValue={inputValue}
      getOptionLabel={(option) => option.label || ""}
      sx={{ width: '300px' }}
      onHighlightChange={(event, option) =>
        option === null ? setSelectedOption(false) : setSelectedOption(true)
      }
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      renderInput={(params) => (
        <TextField
          {...params}
          label={
            <Typography color={theme.palette.neutral.dark}>
              Search
            </Typography>
          }
          variant="standard"
          size='small'
          onClick={handleFocus}
          onBlur={handleBlur}
        />
      )}
      renderOption={(props, option, { selected }) =>
        !option.poster_path & !option.media_type ? (
          <Button
          variant="contained"
          display="flex"
          alignitems="center"
          p={1}
          sx={{ backgroundColor: selected ? theme.palette.primary.main : 'transparent' }}
          onClick={() => handleSearch(option.label)}
          >
          {option.history === true ? (
            <HistoryOutlinedIcon></HistoryOutlinedIcon>
          ) : (
            <SearchOutlinedIcon></SearchOutlinedIcon>
          )}
          <strong>{option.label}</strong>
          </Button>
          ) : (
          <Button 
          variant="contained"
          display="flex"
          alignitems="center"
          p={1}
          sx={{ backgroundColor: selected ? theme.palette.primary.main : 'transparent' }}
          onClick={() => {
            option.media_type === "movie" ? (
              navigate(`../movie/${option.id}`)
              ) : (
              navigate(`../TV Shows/${option.id}`)
              )
          }}
          >
            {option.poster_path ? (
            <Image height='100px' width='200px' src={`https://image.tmdb.org/t/p/w500${option.poster_path}`}/>
            ) : (
            <Image height='100px' width='200px' src={`https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930`}/>
            )}
            <strong>{option.label}</strong>
          </Button>
        )}
    />
  );
};

export default SearchBar;

  