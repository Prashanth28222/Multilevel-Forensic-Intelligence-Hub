import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

export const Layout: React.FC = () => {
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
        return { title: 'Dashboard', subtitle: 'AI Image Authenticity Detection Platform' };
      case '/image':
        return { title: 'Image Analysis', subtitle: 'Frequency, Facial & Semantic Multi-Level Analysis' };
      case '/architecture':
        return { title: 'System Architecture', subtitle: 'Deep Learning Model Sitemap & Ensemble Logic' };
      case '/about':
        return { title: 'About Project', subtitle: 'Platform Overview & Technical Implementation Specifications' };
      default:
        return { title: 'Forensic System', subtitle: 'AI Image Authentication Platform' };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <div className="flex min-h-screen bg-[#070A12] text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={title} subtitle={subtitle} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
