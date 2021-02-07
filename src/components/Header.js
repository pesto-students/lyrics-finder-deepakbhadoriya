import React from 'react';

const Header = () => (
  <header>
    <div className="col-12 header-style">
      <div className="row mx-lg-5 px-lg-5 mx-md-5 mx-sm-1 mx-1">
        <div className="col-6 py-3">
          <h5 className="color-white">SongLyrics.com</h5>
        </div>
        <div className="col-6 py-3" align="right">
          <a href="https://www.linkedin.com/in/deepakbhadoriya" target="new">
            <i className="fab fa-linkedin fa-lg header-icon" />
          </a>
          <a href="https://github.com/pesto-students/lyrics-finder-deepakbhadoriya" target="new">
            <i className="fab fa-github fa-lg header-icon" />
          </a>
        </div>
      </div>
    </div>
    <div className="overlay"></div>
    <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop" height="250px">
      <source
        src="https://static.videezy.com/system/resources/previews/000/042/934/original/bg0024-2.mp4"
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
);

export default Header;
