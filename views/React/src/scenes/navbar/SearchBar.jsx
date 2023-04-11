import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const options = [
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
  ];

  const handleSearch = (value) => {
    console.log('Search for:', value.label);
    // Perform search based on value.label
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(event, value) => handleSearch(value)}
      inputValue={inputValue}
      sx={{ width: isFocused ? '500px' : '200px', transition: 'width 0.5s' }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search..."
          variant="standard"
          onClick={handleFocus}
          onBlur={handleBlur}
        />
      )}
    />
  );
};

export default SearchBar;

  