import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0a0e14] text-[#f1f3fc] font-['Inter'] page-entry">
      <LoadingScreen />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
