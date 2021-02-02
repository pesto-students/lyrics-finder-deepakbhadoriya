import React from 'react';

import styles from './Components.module.css';

const SongCard = ({ item, handleViewLyrics }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 my-3">
      <div
        className="song-card"
        style={{
          backgroundImage: `url( ${item.album.cover_big})`,
        }}
      >
        <h5 className="album-title">
          {item.title.length > 60 ? item.title.substring(0, 60) : item.title}
          {item.title.length > 60 && '......'}
        </h5>
        <div className="bottom-white-container">
          <div className={styles.w100}>
            <img src={item.artist.picture_medium} alt="" className="artist-image" />
            <span className={styles.artistName} className="px-3">
              {item.artist.name}
            </span>
          </div>
          <div className={styles.w100} align="center">
            <button
              type="button"
              className="btn btn-danger button-style"
              onClick={() => handleViewLyrics(item.artist.name, item.title)}
            >
              View Lyrics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
