import React from 'react';

import SongCard from '../components/SongCard';

import defaultHome from '../assets/images/defaultHome.svg';
import noSong from '../assets/images/noSong.png';

const SongCardContainer = ({
  songsList,
  getSongLyrics,
  setModalVisible,
  handleFavorite,
  isFavorite,
}) => {
  if (!songsList) {
    return (
      <div className="col-12" align="center">
        <img loading="lazy" src={defaultHome} style={{ maxHeight: 250 }} alt="" />
      </div>
    );
  }

  if (songsList && songsList.data && songsList.data.length === 0) {
    return (
      <div className="col-12" align="center">
        <img loading="lazy" src={noSong} style={{ maxHeight: 250 }} alt="" />
      </div>
    );
  }

  return songsList && songsList.data
    ? songsList.data.map((item) => (
        <SongCard
          key={item.id}
          item={item}
          handleViewLyrics={(artistName, song) => {
            getSongLyrics(artistName, song);
            setModalVisible(true);
          }}
          isFavorite={isFavorite(item)}
          handleFavorite={handleFavorite}
        />
      ))
    : null;
};

export default SongCardContainer;
