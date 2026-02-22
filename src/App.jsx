import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './Components/AppLayout/AppLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import PurchaseOrders from './pages/PurchaseOrders/PurchaseOrders';
import GRN from './pages/GRN/GRN';
import PurchaseInvoicesAdd from './pages/PurchaseInvoices/PurchaseInvoiceAdd';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/erp/dashboard" replace />} />
          <Route path="erp/dashboard" element={<Dashboard />} />
          <Route path="erp/procurement/purchase-orders" element={<PurchaseOrders />} />
          <Route path="erp/procurement/grn" element={<GRN />} />
          <Route path="erp/procurement/purchase-invoices" element={<PurchaseInvoicesAdd />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
