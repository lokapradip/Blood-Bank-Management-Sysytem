import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DonorManagement from './components/DonorManagement';
import BloodInventory from './components/BloodInventory';
import HospitalRequests from './components/HospitalRequests';
import CompatibilityMatching from './components/CompatibilityMatching';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="donors" element={<DonorManagement />} />
          <Route path="inventory" element={<BloodInventory />} />
          <Route path="requests" element={<HospitalRequests />} />
          <Route path="matching" element={<CompatibilityMatching />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;