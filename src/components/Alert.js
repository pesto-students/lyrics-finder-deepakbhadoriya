import React from 'react';

const Alert = ({ alert: { message, type }, removeAlert }) => {
  const getAlertClass = (type) => {
    if (type === 'error') return 'alert-error';
    if (type === 'success') return 'alert-success';
  };

  const getAlertIcon = (type) => {
    if (type === 'error') return <i className="fas fa-exclamation-triangle"></i>;
    if (type === 'success') return <i className="fas fa-check"></i>;
  };

  return message ? (
    <div className="alertContainer container">
      <div className="row mb-2">
        <div className=" col-12">
          <div className={getAlertClass(type)} role="alert">
            {getAlertIcon(type)}&nbsp;&nbsp; {message} &nbsp;&nbsp;&nbsp;
            <i
              className="far fa-times-circle fa-lg py-2"
              onClick={removeAlert}
              style={{ float: 'right', cursor: 'pointer' }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Alert;
