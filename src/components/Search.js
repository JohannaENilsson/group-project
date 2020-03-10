import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useHistory } from 'react-router-dom';

export default function Search({ searchFilesAndFolders, query }) {
  const [searchInput, setsearchInput] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    searchFilesAndFolders(searchInput);
  }, [searchInput]);

  useEffect(() => {
    setsearchInput('');
  }, [location.key]);

  const onChangeSearch = e => {
    setsearchInput(e.target.value);
  };

  return (
    <div className='searchInputDiv'>
      <input
        type='text'
        name='search'
        className='searchAndAddNewFolderInput'
        placeholder='Search'
        value={searchInput}
        onChange={onChangeSearch}
      />
      <FaSearch className='search' />
    </div>
  );
}
