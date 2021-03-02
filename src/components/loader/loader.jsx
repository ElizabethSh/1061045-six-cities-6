import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__dual-ring" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
