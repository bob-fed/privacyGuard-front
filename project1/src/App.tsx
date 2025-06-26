import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { PrivacyAudit } from './components/PrivacyAudit';
import { PolicyGenerator } from './components/PolicyGenerator';
import { DataRequests } from './components/DataRequests';
import { ComplianceMonitor } from './components/ComplianceMonitor';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="audit" element={<PrivacyAudit />} />
            <Route path="policies" element={<PolicyGenerator />} />
            <Route path="requests" element={<DataRequests />} />
            <Route path="compliance" element={<ComplianceMonitor />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;