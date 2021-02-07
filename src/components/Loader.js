import React from 'react';
import LoaderGIF from '../assets/gif/loader.gif';

const Loader = () => {
  return (
    <div align="center">
      <img
        className="img-fluid"
        loading="lazy"
        src={LoaderGIF}
        width="100px"
        height="100px"
        alt=""
      />
    </div>
  );
};

export default Loader;
