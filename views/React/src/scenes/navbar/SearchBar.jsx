import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme, Typography } from '@mui/material';

const defaultSearchOptions = 
            [{label: "original value 1"},
            {label: "original value 2"}];

const SearchBar = ({ placeholder, data }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [options, setOptions] = useState(defaultSearchOptions);
  const theme = useTheme();

  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = async (value) => {
    console.log();
    //navigate(`/search/${value}`)
  };

  // useEffect(() => {
  //   const alreadyExists = options.some((option) => option.label === inputValue);
  //   if (!alreadyExists && inputValue !== "") {
  //     setOptions([{ label: inputValue }, ...options]);
  //   }
  //   setIsEmpty(inputValue === "");
  // }, [inputValue, options]);
  

  const handleInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue);
    const alreadyExists = options.some((option) => option.label === inputValue);
    if (!alreadyExists && inputValue !== "") {
      setOptions([{ label: inputValue }, ...options]);
    }
    setIsEmpty(inputValue === "");
    setOptions(defaultSearchOptions);
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => option.label}
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

  