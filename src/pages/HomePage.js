import React, { useState } from 'react';
import axios from 'axios';

import SongCard from '../components/SongCard';
import Modal from '../components/Modal';
import Loader from '../components/Loader';

const HomePage = () => {
  const [songsList, setSongsList] = useState(null);
  const [songLyrics, setSongLyrics] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const getSongs = async (searchKeyword) => {
    setSongsList('loading');
    try {
      const res = await axios.get(`https://api.lyrics.ovh/suggest/${searchKeyword}`);
      setSongsList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreSongs = async (url) => {
    setLoadingMore(true);
    try {
      const res = await axios.get(url);
      setSongsList({ ...songsList, data: [...songsList.data, res.data.data], next: res.data.next });
      setLoadingMore(false);
    } catch (error) {
      setLoadingMore(false);
      console.log(error);
    }
  };

  const getSongLyrics = async (artistName, song) => {
    setSongLyrics('loading');
    try {
      const res = await axios.get(`https://api.lyrics.ovh/v1/${artistName}/${song}`);
      setSongLyrics(res.data.lyrics === '' ? 'No lyrics present' : res.data.lyrics);
    } catch (error) {
      console.log(error);
    }
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
    <div className="container-fluid">
      <div className="row">
        <header>
          <div className="overlay"></div>
          <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
            <source
              src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
              type="video/mp4"
            />
          </video>

          <div className="container ">
            <div className="d-flex text-center align-items-center">
              <div className="w-100 text-white">
                <h1 className="home-banner-text">Search Your Song Lyrics</h1>
              </div>
            </div>
          </div>
        </header>

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

      <div className="row mx-lg-5 px-lg-5 mx-md-5">
        {songsList &&
          (songsList === 'loading' ? (
            <Loader />
          ) : (
            songsList.data.map((item) => (
              <SongCard
                key={item.id}
                item={item}
                handleViewLyrics={(artistName, song) => getSongLyrics(artistName, song)}
              />
            ))
          ))}
        {/* <div className="col-12" align="center">
          {loadingMore ? (
            <Loader />
          ) : (
            songsList &&
            songsList.next && (
              <button
                type="button"
                class="btn btn-outline-danger"
                onClick={() => getMoreSongs(songsList.next)}
              >
                Load More
              </button>
            )
          )}
        </div>
       */}
      </div>
      <Modal
        songLyrics={songLyrics}
        handleCancel={() => setSongLyrics(null)}
        handleCopy={handleCopy}
      />
    </div>
  );
};

export default HomePage;
