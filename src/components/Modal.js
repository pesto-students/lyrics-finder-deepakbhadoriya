import React, { Fragment } from 'react';

import styles from './Components.module.css';
import Loader from '../components/Loader';

const Modal = ({ songLyrics, songLyricsLoading, modalVisible, handleCancel, handleCopy }) =>
  modalVisible && (
    <div className="container-fluid modal-background">
      <div className="row">
        <div
          className={`offset-lg-3 col-lg-6 col-12 my-5 p-4 ${styles.lyricsModal}`}
          align="center"
        >
          {songLyricsLoading ? (
            <Loader />
          ) : (
            <div className={styles.lyricsContainer}>
              {songLyrics &&
                songLyrics.split(/\n/g).map((item, index) => (
                  <Fragment key={index}>
                    {item} <br />
                  </Fragment>
                ))}
            </div>
          )}
          <hr />
          <div className={styles.modalButtonContainer} align="center">
            <button
              type="button"
              className="btn btn-secondary button-style mx-1"
              onClick={handleCancel}
            >
              Close <i className="far fa-times-circle"></i>
            </button>
            <button
              disabled={songLyricsLoading || songLyrics === 'No lyrics present'}
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
