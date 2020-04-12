import React from 'react';
import FontAwesome from 'react-fontawesome';
import StyledSearchbar from '../elements/StyledSearchbar';

const Searchbar = () => {
  return (
    <StyledSearchbar>
      <label className="searchbar--label">
        <FontAwesome name="search" className="searchbar--icon" />
        <input type="search" className="searchbar--input" placeholder="Rechercher ou Démarrer une discussion" />
      </label>
    </StyledSearchbar>
  );
};

export default Searchbar;