import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [defaultSearchOptions, setDefaultSearchOptions] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [options, setOptions] = useState([]);
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserSearch = async (userID, numberOfEntry) => {
      try {
        const fetchUserSearchResponse = await fetch(
          `http://localhost:5000/user-search-history?userID=${userID}&limit=${numberOfEntry}`,
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
        const searchedStrings = userSearchData.map((search) => search.searchedString);
  
        setDefaultSearchOptions(await searchedStrings.map((search) => {
          return {
            label: search,
          };
        }));
      } catch (error) {
        console.error(error);
      };
    };
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
      "http://localhost:5000/user-search-history/insert",
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
  };

  const handleSearch = async (value) => {
    if (!selectedOption && value !== "") {
      insertUserSearch(user._id, value);
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
    const alreadyExists = options.some((option) => option.label === newInputValue);
    if (!alreadyExists) {
      setOptions([{ label: newInputValue }, ...defaultSearchOptions]);
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label || ""}
      inputValue={inputValue}
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
    />
  );
};

export default SearchBar;

  