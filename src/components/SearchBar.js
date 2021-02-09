import React from 'react';

import styles from './Components.module.css';

const SearchBar = ({
  handleSearch,
  handleOnChange,
  searchKeyword,
  showFavorites,
  toggleFavorite,
}) =>
  showFavorites ? (
    <div className="offset-lg-3 col-lg-6 col-sm-12 mb-5" align="center">
      <div className="back-button-container">
        <button
          type="button"
          className="btn btn-danger"
          style={{ borderRadius: 100 }}
          onClick={toggleFavorite}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>
    </div>
  ) : (
    <div className="offset-lg-3 col-lg-6 col-sm-12 mb-5" align="center">
      <div className="search-bar-container" align="left">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="search-bar"
            onChange={handleOnChange}
            value={searchKeyword}
            placeholder="Enter your favorite Song or Artist name here"
          />
          <button
            type="button"
            className={`btn btn-danger mx-1 ${styles.searchButton}`}
            onClick={toggleFavorite}
          >
            <i className="fas fa-heart color-white"></i>
          </button>
          <button
            type="button"
            className={`btn btn-danger mx-1 ${styles.searchButton}`}
            onClick={handleSearch}
          >
            <i className="fas fa-search "></i>
          </button>
        </form>
      </div>
    </div>
  );

export default SearchBar;
