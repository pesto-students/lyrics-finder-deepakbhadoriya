import React from 'react';

const Footer = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 p-2 color-white background-primary" align="center">
          SongLyrics Ⓒ {new Date().getFullYear()}. All right reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
