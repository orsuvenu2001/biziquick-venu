import React from 'react';
import './GRN.scss';

const GRN = () => {
  return (
    <div className="grn-page">
      <div className="page-header">
        <h1>Goods Receipt Notes</h1>
        <button className="btn-primary">+ Create GRN</button>
      </div>
      
      <div className="content-card">
        <p>Goods Receipt Notes list will appear here</p>
      </div>
    </div>
  );
};

export default GRN;
