import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme, Typography, Button } from '@mui/material';
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
  const navigate = useNavigate();


  const fetchSearchResult = async (value) => {
    try {
      const fetchSearchResultResponse = await fetch(
        `${VITE_BASE_URL}/search/?query=${value}&page=1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      const data = await fetchSearchResultResponse.json();
      const results = data.results
        .filter((movie) => movie.media_type === 'tv' || movie.media_type === 'movie')
        .map((movie) => ({
          label: movie.original_name ? movie.original_name : movie.original_title,
          id: movie.id,
          poster_path: movie.backdrop_path,
          media_type: movie.media_type,
        }));
      setSearchedMovies(results);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserSearch = async (userID, numberOfEntry) => {
    try {
      const fetchUserSearchResponse = await fetch(
        `${VITE_BASE_URL}/api/history/get?userID=${userID}&limit=${numberOfEntry}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      if (!fetchUserSearchResponse.ok) {
        throw new Error('Failed to fetch user search data');
      }
      const userSearchData = await fetchUserSearchResponse.json();
      const searchedStrings = userSearchData.History_return.map((search) => search.searchedString);

      setDefaultSearchOptions(
        await searchedStrings.map((search) => {
          return {
            label: search,
            history: true,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
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
  }, [options]);

  const insertUserSearch = async (userID, searchedString) => {
    const requestData = {
      userID,
      searchedString,
      createdAt: new Date(),
    };
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setSelectedOption(false);
  };

  const handleSearch = async (value) => {
    if (!selectedOption && value !== '') {
      await insertUserSearch(user._id, value);
      fetchUserSearch(user._id, 5);
      navigate(`/home/search/?query=${value}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (selectedOption) {
        setSelectedOption(false);
      }
      handleSearch(inputValue);
    }
  };

  const handleInputChange = async (_event, newInputValue) => {
    setInputValue(newInputValue);
    fetchSearchResult(newInputValue);
    const alreadyExists = options.some((option) => option.label === newInputValue);
    if (!alreadyExists) {
      setOptions([{ label: newInputValue }, ...defaultSearchOptions, ...searchedMovies]);
      if (newInputValue === '') {
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
      getOptionLabel={(option) => option.label || ''}
      sx={{ width: '100%' }}
      onHighlightChange={(_event, option) =>
        option === null ? setSelectedOption(false) : setSelectedOption(true)
      }
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      renderInput={(params) => (
        

        <TextField
  {...params}
  label={
    <Typography color={'white'} fontSize={'20px'} marginLeft={'20px'} sx={{ position: 'relative', top: '-10px', zIndex: 1, marginTop: '2px' }}>
      Search
    </Typography>
  }
  variant="standard"
  size="small"
  onClick={handleFocus}
  onBlur={handleBlur}
  sx={{
    width: '100%',
    border: '2px solid transparent',
    borderRadius: '20px',
    outline: 'none',
    backgroundColor: '#060047',
    color: '#060047',
    boxShadow: '0 0 5px #FF5F9E, 0 0 0 10px #E90064',
    transition: '.3s ease',
    '& input::placeholder': {
      color: 'red',
      '&::placeholder': {
        borderColor: 'transparent',
      },
    },
    '& .MuiInput-underline:before': {
      borderBottom: 'none', // Remove the underline
    },
    '& .MuiInput-underline.Mui-focused': {
      '&:before': {
        borderBottom: 'none', // Remove the underline on focus
      },
      '&:after': {
        borderBottom: 'none', // Remove the outline on focus
      },
    },
    '&:hover': {
      transform: 'scale(1.2)',
      boxShadow: '2px 5px 0 0 black',
      backgroundColor: '#E90064',
      '& .MuiInput-underline:before': {
        borderBottom: 'none', // Remove the underline on hover
      },
    },
    '& .MuiInput-underline.Mui-disabled:before': {
      borderBottomStyle: 'none', // Remove the underline for disabled state
    },
    '& .MuiInput-underline.Mui-disabled:after': {
      borderBottomStyle: 'none', // Remove the outline for disabled state
    },
    '@media (min-width: 1000px)': {
      width: '300px',
    },
    '@media (max-width: 1000px)': {
      width: '600px',
    },
    '@media (max-width: 800px)': {
      width: '300px',
    },
    '@media (max-width: 500px)': {
      width: '300px',
    },
  }}
/>



      


      


      )}
      renderOption={(_props, option, { selected }) =>
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
              option.media_type === 'movie'
                ? navigate(`../movie/${option.id}`)
                : navigate(`../TV Shows/${option.id}`);
            }}
          >
            {option.poster_path ? (
              <Image height="100px" width="200px" src={`https://image.tmdb.org/t/p/w500${option.poster_path}`} />
            ) : (
              <Image
                height="100px"
                width="200px"
                src={'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'}
              />
            )}
            <strong>{option.label}</strong>
          </Button>
        )
      }
    />
  );
};

export default SearchBar;
