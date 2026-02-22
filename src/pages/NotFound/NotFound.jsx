import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';
import { BiError } from 'react-icons/bi';
import { IoHomeOutline } from 'react-icons/io5';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-icon">
          <BiError />
        </div>
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="error-actions">
          <button className="btn-primary" onClick={() => navigate('/erp/dashboard')}>
            <IoHomeOutline />
            Go to Dashboard
          </button>
          <button className="btn-secondary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
