import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

import SongCard from '../components/SongCard';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import defaultHome from '../assets/images/defaultHome.svg';

import songActions from '../actions/songActions';

const HomePage = () => {
  const [songsList, setSongsList] = useState(null);
  const [songsListLoading, setSongsListLoading] = useState(false);
  const [songLyrics, setSongLyrics] = useState(null);
  const [songLyricsLoading, setSongLyricsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const getSongs = (searchKeyword) => {
    songActions.getSongs({
      setLoading: setSongsListLoading,
      setData: setSongsList,
      searchKeyword,
    });
  };

  const getMoreSongs = (url) => {
    songActions.getMoreSongs({ setLoading: setLoadingMore, setData: setSongsList, url, songsList });
  };

  const getSongLyrics = (artistName, song) => {
    songActions.getSongLyrics({
      setLoading: setSongLyricsLoading,
      setData: setSongLyrics,
      artistName,
      song,
    });
  };

  const handleSearch = (e, query = searchKeyword) => {
    e && e.preventDefault();
    getSongs(query);
  };

  // eslint-disable-next-line
  const debounceSearch = useCallback(
    debounce((searchKeyword) => {
      handleSearch(null, searchKeyword);
    }, 500),
    []
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(songLyrics);
  };

  const handleOnChange = (e) => {
    const searchQuery = e.target.value;
    setSearchKeyword(searchQuery);
    debounceSearch(searchQuery);
  };

  return (
    <>
      <Header />
      <div className="container-fluid  ">
        <div className="row">
          <SearchBar
            handleSearch={handleSearch}
            handleOnChange={handleOnChange}
            searchKeyword={searchKeyword}
          />
        </div>
        <div
          className="row mx-lg-5 px-lg-5 mx-md-5"
          style={{ minHeight: window.innerHeight - 422 }}
        >
          {songsListLoading ? (
            <Loader />
          ) : songsList ? (
            songsList.data.map((item) => (
              <SongCard
                key={item.id}
                item={item}
                handleViewLyrics={(artistName, song) => {
                  getSongLyrics(artistName, song);
                  setModalVisible(true);
                }}
              />
            ))
          ) : (
            <img src={defaultHome} alt="" height="250px" />
          )}
          <div className="col-12" align="center">
            {loadingMore ? (
              <Loader />
            ) : (
              songsList &&
              songsList.next && (
                <button
                  type="button"
                  className="btn btn-outline-danger my-4"
                  onClick={() => getMoreSongs(songsList.next.replace('http', 'https'))}
                >
                  Load More
                </button>
              )
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
