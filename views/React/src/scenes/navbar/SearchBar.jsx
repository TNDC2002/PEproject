import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const defaultSearchOptions = 
            [{label: "original value 1"},
            {label: "original value 2"}];

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [options, setOptions] = useState(defaultSearchOptions);
  const theme = useTheme();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const navigate = useNavigate();

  const uploadUserSearch = async (userID, searchedString) => {
    const requestData = {
      userID: userID,
      searchedString: searchedString,
      createdAt: new Date()
    };

    const uploadUserSearchResponse = await fetch(
      "http://localhost:5000/user/search/upload",
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
    uploadUserSearch(user._id, inputValue);
  };
  
  

  const handleInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue);
    const alreadyExists = options.some((option) => option.label === newInputValue);
    if (!alreadyExists && newInputValue !== "") {
      setOptions([{ label: newInputValue }, ...defaultSearchOptions]);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => option.label || ""}
      onChange={(value) => handleSearch(value)}
      inputValue={inputValue}
      sx={{ width: '300px' }}
      onInputChange={handleInputChange}
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

  