import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import StyledSearchbar from '../elements/StyledSearchbar';
import { IHandleFabInputChange } from '/imports/api/interfaces/functions.interface';

interface SearchbarProps {
  placeholder: string;
  onSearch: any;
};

const Searchbar = ({ placeholder, onSearch }: SearchbarProps) => {
  const [state, setState] = useState("");
  
  const handleChange: IHandleFabInputChange = (e) => {
    const pattern = e.target.value;
    setState(pattern);
    onSearch(pattern);
  };

  return (
    <StyledSearchbar>
      <label className="searchbar--label">
        <FontAwesome name="search" className="searchbar--icon" />
        <input 
          type="search"
          className="searchbar--input"
          placeholder={placeholder}
          value={state}
          onChange={handleChange}
        />
      </label>
    </StyledSearchbar>
  );
};

export default Searchbar;