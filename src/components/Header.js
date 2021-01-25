import React from 'react';

const Header = () => (
  <header>
    <div className="overlay"></div>
    <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
      <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
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
