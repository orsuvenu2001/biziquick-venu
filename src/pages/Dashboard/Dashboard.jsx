import React from 'react';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to your ERP dashboard</p>
      </div>
      
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Orders</h3>
          <p className="card-value">245</p>
          <span className="card-label">This month</span>
        </div>
        
        <div className="card">
          <h3>Pending Invoices</h3>
          <p className="card-value">18</p>
          <span className="card-label">Requires action</span>
        </div>
        
        <div className="card">
          <h3>Inventory Items</h3>
          <p className="card-value">1,234</p>
          <span className="card-label">In stock</span>
        </div>
        
        <div className="card">
          <h3>Revenue</h3>
          <p className="card-value">₹48.6L</p>
          <span className="card-label">This quarter</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
