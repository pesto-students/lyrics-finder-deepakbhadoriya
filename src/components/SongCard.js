import React from 'react';

const SongCard = ({ item, handleViewLyrics }) => {
  return (
    <div className="col-lg-3 col-md-4 col-6 my-3">
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
          <div style={{ width: '100%' }}>
            <img src={item.artist.picture_medium} alt="" className="artist-image" />
            <span style={{ fontSize: 18, alignItems: 'center', width: '100%' }} className="px-3">
              {item.artist.name}
            </span>
          </div>
          <div className="" style={{ width: '100%' }} align="center">
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
