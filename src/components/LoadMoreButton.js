import React from 'react';

const LoadMoreButton = ({ songsList, getMoreSongs }) =>
  songsList && songsList.data.length < songsList.total ? (
    <button type="button" className="btn btn-outline-danger my-4" onClick={getMoreSongs}>
      Load More
    </button>
  ) : null;

export default LoadMoreButton;
