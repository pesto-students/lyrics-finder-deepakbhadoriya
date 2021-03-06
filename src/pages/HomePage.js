import React, { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'lodash/debounce';

import Alert from '../components/Alert';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import LoadMoreButton from '../components/LoadMoreButton';
import SongCardContainer from '../components/SongCardContainer';

import songActions from '../actions/songActions';
import favoriteSongCRUD from '../actions/favoriteSongCRUD';

const HomePage = () => {
  const [songsList, setSongsList] = useState(null);
  const [songsListLoading, setSongsListLoading] = useState(false);
  const [songLyrics, setSongLyrics] = useState(null);
  const [songLyricsLoading, setSongLyricsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [alert, setAlert] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // remove alert after 3 second
  useEffect(() => {
    setTimeout(() => setAlert(false), 2000);
  }, [alert, setAlert]);

  // Get favorite from localStorage to localState
  const getFavoriteSongs = useCallback(() => {
    const songs = favoriteSongCRUD.getAllFavSong();
    setFavoriteSongs(songs);
    if (showFavorites) {
      setSongsList({ data: songs });
    }
  }, [setFavoriteSongs, setSongsList, showFavorites]);

  // execute getFavoriteSongs for component mound
  useEffect(() => getFavoriteSongs(), [getFavoriteSongs]);

  // Handle search by enter or search button click
  const handleSearch = (e, query = searchKeyword) => {
    e && e.preventDefault();
    getSongs(query);
  };

  // ? Debounce search using UseCallback() leaved it for future reference
  // const debounceSearch = useCallback(
  //   debounce((searchKeyword) => {
  //     handleSearch(null, searchKeyword);
  //   }, 500),
  //   [debounce, handleSearch, searchKeyword]
  // );

  // ? Debounce Search using useRef()
  const debounceSearch = useRef(
    debounce((searchKeyword) => {
      handleSearch(null, searchKeyword);
    }, 500)
  ).current;

  // Execute search on change in search keyword
  useEffect(() => {
    debounceSearch(searchKeyword);
  }, [searchKeyword, debounceSearch]);

  // fetch songs from api
  const getSongs = (searchKeyword) => {
    songActions.getSongs({
      setLoading: setSongsListLoading,
      setData: setSongsList,
      setAlert,
      searchKeyword,
    });
  };

  // fetch more songs from api
  const getMoreSongs = () => {
    const index = songsList.data.length;
    songActions.getMoreSongs({
      setLoading: setLoadingMore,
      setData: setSongsList,
      setAlert,
      searchKeyword,
      index,
      songsList,
    });
  };

  // fetch song lyrics
  const getSongLyrics = (artistName, song) => {
    songActions.getSongLyrics({
      setLoading: setSongLyricsLoading,
      setData: setSongLyrics,
      setAlert,
      artistName,
      song,
    });
  };

  // copy song lyrics to clipboard
  const handleCopy = async () => {
    // await navigator.clipboard.writeText(songLyrics);
    const el = document.createElement('textarea');
    el.value = songLyrics;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setAlert({ message: 'Copied to clipboard', type: 'success' });
  };

  // save search keyword in state
  const handleOnChange = (e) => setSearchKeyword(e.target.value);

  // Handle song add and remove from local storage
  const handleFavorite = (song) => {
    if (isFavorite(song)) {
      favoriteSongCRUD.removeSong(song);
      getFavoriteSongs();
      setAlert({ message: 'Song Removed from favorites', type: 'success' });
    } else if (favoriteSongs.length > 50) {
      setAlert({ message: 'Only fifty songs can be added to favorites', type: 'error' });
      return null;
    } else {
      favoriteSongCRUD.addSong(song);
      getFavoriteSongs();
      setAlert({ message: 'Song Added to favorites', type: 'success' });
    }
  };

  //check if song is already present
  const isFavorite = (song) => {
    return favoriteSongs.find((item) => item.id === song.id);
  };

  // Toggle display favorites
  const toggleFavorite = () => {
    setSongsList(false);
    if (!showFavorites) {
      setTimeout(() => setSongsList({ data: favoriteSongs }), 100);
    }
    setShowFavorites(!showFavorites);
  };

  return (
    <>
      <Header showFavorites={showFavorites} />
      <Alert alert={alert} removeAlert={() => setAlert(false)} />
      <div className="container-fluid  ">
        <div className="row">
          <SearchBar
            handleSearch={handleSearch}
            handleOnChange={handleOnChange}
            showFavorites={showFavorites}
            toggleFavorite={toggleFavorite}
          />
        </div>
        <div
          className="row mx-lg-5 px-lg-5 mx-md-5"
          style={{ minHeight: window.innerHeight - 373 }}
        >
          {songsListLoading ? (
            <Loader />
          ) : (
            <SongCardContainer
              songsList={songsList}
              getSongLyrics={getSongLyrics}
              setModalVisible={setModalVisible}
              handleFavorite={handleFavorite}
              isFavorite={isFavorite}
            />
          )}
          <div className="col-12" align="center">
            {loadingMore ? (
              <Loader />
            ) : (
              <LoadMoreButton songsList={songsList} getMoreSongs={getMoreSongs} />
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        modalVisible={modalVisible}
        songLyrics={songLyrics}
        songLyricsLoading={songLyricsLoading}
        handleCancel={() => {
          setSongLyrics(null);
          setModalVisible(false);
        }}
        handleCopy={handleCopy}
      />
    </>
  );
};

export default HomePage;
