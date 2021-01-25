import React from 'react';

import Loader from '../components/Loader';

const Modal = ({ songLyrics, handleCancel, handleCopy }) =>
  songLyrics && (
    <div
      className="container-fluid"
      style={{
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: ' rgba(0, 0, 0, 0.8)',
      }}
    >
      <div className="row">
        <div
          className="offset-lg-3 col-lg-6 col-12 my-5 p-4"
          style={{ backgroundColor: 'white', borderRadius: 8 }}
          align="center"
        >
          {songLyrics === 'loading' ? (
            <Loader />
          ) : (
            <div style={{ overflow: 'auto', height: '500px' }}>
              {songLyrics.split(/\n/g).map((item) => (
                <>
                  {item} <br />
                </>
              ))}
            </div>
          )}
          <hr />
          <div style={{ width: '100%', height: 30 }} align="center">
            <button
              type="button"
              className="btn btn-secondary button-style mx-1"
              onClick={handleCancel}
            >
              Close <i className="far fa-times-circle"></i>
            </button>
            <button
              disabled={songLyrics === 'loading'}
              type="button"
              className="btn btn-danger button-style mx-1"
              onClick={handleCopy}
            >
              Copy <i className="far fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

export default Modal;
