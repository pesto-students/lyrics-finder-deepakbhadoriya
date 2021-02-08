import React from 'react';

import styles from './Components.module.css';

const SongCard = ({ item, handleViewLyrics, handleFavorite, isFavorite }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 my-3">
      <div
        className="song-card"
        style={{
          backgroundImage: `url( ${item.album.cover_big})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <h5 className="album-title">
          {item.title.length > 60 ? item.title.substring(0, 60) : item.title}
          {item.title.length > 60 && '......'}
        </h5>
        <div className="bottom-white-container">
          <div className={styles.fullWidth}>
            <img
              className="img-fluid artist-image"
              loading="lazy"
              src={item.artist.picture_medium}
              alt=""
            />
            <span className={`${styles.artistName} px-3`}>{item.artist.name}</span>
          </div>
          <div className={styles.fullWidth} align="center">
            <button
              type="button"
              className="btn btn-danger button-style"
              onClick={() => handleViewLyrics(item.artist.name, item.title)}
            >
              View Lyrics
            </button>
            <button
              type="button"
              className="btn btn-light button-style-fav mx-2"
              onClick={() => handleFavorite(item)}
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Add to Favorite"
            >
              {isFavorite ? (
                <i className="fas fa-heart color-primary"></i>
              ) : (
                <i className="far fa-heart color-primary"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
