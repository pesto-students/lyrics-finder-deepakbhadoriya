const getAllFavSong = () => {
  const allSongs = localStorage.getItem('favoriteSongs');
  return JSON.parse(allSongs) || [];
};

const addSong = (song) => {
  const allSongs = getAllFavSong();
  localStorage.setItem('favoriteSongs', JSON.stringify([...allSongs, song]));
};

const removeSong = (song) => {
  const allSongs = getAllFavSong();
  localStorage.setItem(
    'favoriteSongs',
    JSON.stringify(allSongs.filter((item) => item.id !== song.id))
  );
};

const FavoriteSongCRUD = { getAllFavSong, addSong, removeSong };

export default FavoriteSongCRUD;
