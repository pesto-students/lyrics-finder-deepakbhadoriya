import React from 'react';

const Footer = () => {
  return (
    <div className="container-fluid" style={{ height: 15 }}>
      <div className="row">
        <div
          className="col-12 p-2"
          style={{ backgroundColor: '#dc3444', color: '#fff' }}
          align="center"
        >
          SongLyrics Ⓒ {new Date().getFullYear()}. All right reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
