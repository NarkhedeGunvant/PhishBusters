import { useState, useEffect } from 'react';
import './styles/global.css';
import Navbar from './components/nav/Navbar';
import Footer from './components/nav/Footer';
import Hero from './components/hero/Hero';
import Features from './components/features/Features';
import URLScanner from './components/scan/URLScanner';
import EmailScanner from './components/scan/EmailScanner';
import LoginModal from './components/auth/LoginModal';
import SignupModal from './components/auth/SignupModal';
import BlogGrid from './components/blog/BlogGrid';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import ScanURL from './pages/ScanURL';
import ScanEmail from './pages/ScanEmail';
import Blog from './pages/Blog';
import Report from './pages/Report';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/scan-url" element={<ScanURL />} />
          <Route path="/scan-email" element={<ScanEmail />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
