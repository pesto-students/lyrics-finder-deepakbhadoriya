import React, { useState } from 'react';

import SongCard from '../components/SongCard';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import defaultHome from '../assets/images/defaultHome.svg';

import songActions from '../actions/songActions';

const HomePage = () => {
  const [songsList, setSongsList] = useState(null);
  const [songsListLoading, setSongsListLoading] = useState(false);
  const [songLyrics, setSongLyrics] = useState(null);
  const [songLyricsLoading, setSongLyricsLoading] = useState(false);
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

  const handleSearchKeywordInput = (value) => {
    setSearchKeyword(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getSongs(searchKeyword);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(songLyrics);
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <Header />
          <div className="offset-lg-3 col-lg-6 col-sm-12 mb-5" align="center">
            <div className="search-bar-container" align="left">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="search-bar"
                  value={searchKeyword}
                  onChange={(e) => handleSearchKeywordInput(e.target.value)}
                  aria-describedby="emailHelp"
                  placeholder="Enter your favorite Song or Artist name here"
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ float: 'right', borderRadius: 100 }}
                  onClick={handleSearch}
                >
                  <i className="fas fa-search "></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div
          className="row mx-lg-5 px-lg-5 mx-md-5"
          style={{ minHeight: window.innerHeight - 370 }}
        >
          {songsListLoading ? (
            <Loader />
          ) : songsList ? (
            songsList.data.map((item) => (
              <SongCard
                key={item.id}
                item={item}
                handleViewLyrics={(artistName, song) => getSongLyrics(artistName, song)}
              />
            ))
          ) : (
            <img src={defaultHome} alt="" height="300px" />
          )}
          <div className="col-12" align="center">
            {loadingMore ? (
              <Loader />
            ) : (
              songsList &&
              songsList.next && (
                <button
                  type="button"
                  class="btn btn-outline-danger my-4"
                  onClick={() => getMoreSongs(songsList.next)}
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
        songLyrics={songLyrics}
        songLyricsLoading={songLyricsLoading}
        handleCancel={() => setSongLyrics(null)}
        handleCopy={handleCopy}
      />
    </>
  );
};

export default HomePage;
