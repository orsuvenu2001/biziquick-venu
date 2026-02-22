import React from 'react';
import './PurchaseOrders.scss';

const PurchaseOrders = () => {
  return (
    <div className="purchase-orders-page">
      <div className="page-header">
        <h1>Purchase Orders</h1>
        <button className="btn-primary">+ Create Purchase Order</button>
      </div>
      
      <div className="content-card">
        <p>Purchase Orders list will appear here</p>
      </div>
    </div>
  );
};

export default PurchaseOrders;
