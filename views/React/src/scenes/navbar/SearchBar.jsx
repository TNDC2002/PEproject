import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme, Typography, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Image from 'mui-image';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const Group = styled('div')({
  display: 'flex',
  lineHeight: '28px',
  alignItems: 'center',
  position: 'relative',
  maxWidth: '190px',
});

const Input = styled(TextField)({
  height: '40px',
  lineHeight: '28px',
  padding: '0 1rem',
  width: '100%',
  paddingLeft: '2.5rem',
  border: '2px solid transparent',
  borderRadius: '8px',
  outline: 'none',
  backgroundColor: '#D9E8D8',
  color: '#0d0c22',
  boxShadow: '0 0 5px #C1D9BF, 0 0 0 10px #f5f5f5eb',
  transition: '.3s ease',

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },

  '& input::placeholder': {
    color: '#777',
  },
});

const Icon = styled('div')({
  position: 'absolute',
  left: '1rem',
  fill: '#777',
  width: '1rem',
  height: '1rem',
});

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
        `${VITE_BASE_URL}/search/?query=${value}&page=1`,
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
        `${VITE_BASE_URL}/api/history/get?userID=${userID}&limit=${numberOfEntry}`,
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
      `${VITE_BASE_URL}/api/history/insert`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData),
        credentials: 'include'
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
  const handleClearInput = () => {
    setInputValue('');
    setIsEmpty(true);
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
          placeholder={
            "Search"
          }
          sx = {{
            height: "40px",
            lineHeight: "28px",
            padding: "0 1rem",
            width: "100%",
            paddingLeft: "2.5rem",
            border: "2px solid transparent",
            borderRadius: "8px",
            outline: "none",
            backgroundColor: "#D9E8D8",
            color: "#0d0c22",
            boxShadow: "0 0 5px #C1D9BF, 0 0 0 10px #f5f5f5eb",
            transition: "3s ease",
            '& input::placeholder': {
              color: 'red',
              '&::placeholder': {
                // Make the border transparent
                borderColor: 'transparent',
              },}
          }}
          onClick={handleFocus}
          onBlur={handleBlur}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <SearchIcon className="icon" />
                {inputValue && (
                  <ClearIcon
                    className="icon"
                    onClick={() => setInputValue('')}
                    sx={{ cursor: 'pointer' }}
                  />
                )}
              </>
            ),
          }}
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
              <Image height='100px' width='200px' src={`https://image.tmdb.org/t/p/w500${option.poster_path}`} />
            ) : (
              <Image height='100px' width='200px' src={`https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930`} />
            )}
            <strong>{option.label}</strong>
          </Button>
        )}
    />
  );
};

export default SearchBar;

