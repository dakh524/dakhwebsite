import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ToastProvider';
import MobileBanner from './components/MobileBanner';

// Layouts
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Internships from './pages/Internships';
import Services from './pages/Services';
import ServicesUpdated from './pages/ServicesUpdated';
import Tools from './pages/Tools';
import UsefulTools from './pages/UsefulTools';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import AdminCourses from './pages/AdminCourses';
import AdminInternships from './pages/AdminInternships';
import AdminServices from './pages/AdminServices';
import AdminTools from './pages/AdminTools';
import AdminTeam from './pages/AdminTeam';
import AdminPartners from './pages/AdminPartners';
import AdminWorks from './pages/AdminWorks';
import AdminEvents from './pages/AdminEvents';
import AdminSiteSettings from './pages/AdminSiteSettings';
import AdminOpportunities from './pages/AdminOpportunities';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Opportunities from './pages/Opportunities';
import FunZone from './pages/FunZone';
import PlacementZone from './pages/PlacementZone';
import AssetsLibrary from './pages/AssetsLibrary';

// Tool Pages
import ResumePage from './pages/ResumePage';
import QRPage from './pages/QRPage';
import GPAPage from './pages/GPAPage';
import SummarizerPage from './pages/SummarizerPage';
import TimerPage from './pages/TimerPage';


function App() {
  return (
    <AuthProvider>
      <ToastProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services-updated" element={<ServicesUpdated />} />
            <Route path="/tools" element={<Tools />} />
             <Route path="/useful-tools" element={<UsefulTools />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/funzone" element={<FunZone />} />
            <Route path="/placement-zone" element={<PlacementZone />} />
            <Route path="/assets-library" element={<AssetsLibrary />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            {/* Embedded Tools */}
            <Route path="/tools/resume" element={<ResumePage />} />
            <Route path="/tools/qr" element={<QRPage />} />
            <Route path="/tools/gpa" element={<GPAPage />} />
            <Route path="/tools/summarizer" element={<SummarizerPage />} />
            <Route path="/tools/timer" element={<TimerPage />} />
          </Route>

          {/* Admin Auth */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            {/* Placeholder routes for the sidebar links */}
            <Route path="courses" element={<AdminCourses />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="internships" element={<AdminInternships />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="tools" element={<AdminTools />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="works" element={<AdminWorks />} />
            <Route path="settings" element={<AdminSiteSettings />} />
            <Route path="opportunities" element={<AdminOpportunities />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <MobileBanner />
      </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
