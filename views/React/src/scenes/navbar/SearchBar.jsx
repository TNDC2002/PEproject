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
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
      ];

    return (
        <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(event, value) => handleSearch(value)}
      inputValue={inputValue}
      sx={{ width: isFocused ? "500px" : "200px", transition: "width 0.5s" }} 
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} 
        label="Search..."
        variant="standard"
        onClick={handleFocus}
        onBlur={handleBlur} />
      )}
    />
  
    );
  };

  export default SearchBar;

  