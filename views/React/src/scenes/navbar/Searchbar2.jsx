import React, { useState } from 'react';
import { Input, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { SearchOutlined } from '@mui/icons-material';

const InputWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  position: relative;
`;

const InputComponent = styled(Input)`
  border-style: none;
  height: 50px;
  width: 50px;
  padding: 10px;
  outline: none;
  border-radius: 50%;
  transition: 0.5s ease-in-out;
  box-shadow: 0px 0px 3px #f3f3f3;
  padding-right: 40px;
  color: #fff;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 17px;
  color: ##FF5F9E;
  border-radius: 50%;

  &::placeholder {
    color: transparent;
  }

  &.focused {
    box-shadow: none;
    width: 250px;
    border-radius: 25px;
    color: white;
    background-color: #FF5F9E;
    border-bottom: linear-gradient(252deg, rgba(255,255,255,1) 0%, rgba(255,138,188,1) 50%, rgba(179,0,94,1) 100%);
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  }
`;

const IconButtonStyled = styled(IconButton)(({ focused }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    cursor: 'pointer',
    width: 50,
    height: 50,
    outline: 'none',
    borderStyle: 'none',
    borderRadius: '50%',
    pointerEvents: 'painted',
    transition: '0.2s linear',
    backgroundColor: focused ? 'transparent' : '#FF5F9E',
   
  }));


const SearchBar2 = () => {
  const [searchValue, setSearchValue] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleInputBlur = () => {
    setFocused(false);
  };

  return (
    <InputWrapper>
      <IconButtonStyled focused={focused}>
        <SearchOutlined sx={{fontSize: '2.0rem'}} />
      </IconButtonStyled>
      <InputComponent
        disableUnderline={true}
        placeholder="search.."
        name="text"
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className={`input ${focused ? 'focused' : ''}`}
      />
    </InputWrapper>
  );
};

export default SearchBar2;
