import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {

  return (
    <div className="min-h-screen bg-[#0a0e14] text-[#f1f3fc] font-['Inter']">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
