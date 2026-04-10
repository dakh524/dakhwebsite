import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0e14] text-[#f1f3fc] font-['Inter']">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
