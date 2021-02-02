import React from 'react';

import styles from './Components.module.css';

const SearchBar = ({ handleSearch, handleOnChange, searchKeyword }) => (
  <div className="offset-lg-3 col-lg-6 col-sm-12 mb-5" align="center">
    <div className="search-bar-container" align="left">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="search-bar"
          value={searchKeyword}
          onChange={handleOnChange}
          aria-describedby="emailHelp"
          placeholder="Enter your favorite Song or Artist name here"
        />
        <button
          type="button"
          className={`btn btn-danger ${styles.searchButton}`}
          onClick={handleSearch}
        >
          <i className="fas fa-search "></i>
        </button>
      </form>
    </div>
  </div>
);

export default SearchBar;
